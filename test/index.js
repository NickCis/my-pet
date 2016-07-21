import hippie from 'hippie';
import chai, { expect, should } from 'chai';
import mockery from 'mockery';

const SQL_RESPONSES = {
  "SELECT * from users where username = 'admin' AND password = 'admin'": {
    rows: [{
      username: 'admin',
      password: 'admin'
    }]
  }
}

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNDY4NTU1MzMwfQ.IsMPfnrNLYA53HczYty5dAwwSZuaqzSPX3AsQmCNXBs';

const mockSql = query => Promise.resolve(SQL_RESPONSES[query] || { rows: [] });

describe('Server', () => {
  let server;

  before(() => {
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false
    });

    mockery.registerMock('./db', {
      middleware: () => {
        return (req, res, next) => {
          req.db = {
            doQuery: query => mockSql(query)
          };
          req.hasDBError = () => {};
          next();
        };
      }
    })

    const Server = require('../server').default;
    server = (new Server()).server;
  });

  after(() => {
    mockery.disable();
  });


  describe('GET /auth', () => {
    const endpoint = () => hippie(server)
      .json()
      .post('/api/auth');

    it('should return success with valid user should work', () => {
      return endpoint()
        .send({ username: 'admin', password: 'admin'})
        .expectStatus(200)
        .expect((res, body, next) => {
          expect(body).to.have.all.keys(['token']);
          next();
        })
        .end();
    });

    it('should return 401 with invalid user', () => {
      return endpoint()
        .send({ username: 'admin', password: 'pepe'})
        .expectStatus(401)
        .expect((res, body, next) => {
          expect(body).to.have.all.keys(['error']);
          next();
        })
        .end();
    });
  });

  describe('POST /user', () => {
    const endpoint = () => hippie(server)
      .json()
      .post('/api/user');

    it('should create a user', () => {
      return endpoint()
        .send({ username: 'admin', password: 'admin', name: 'Administrador', surname: 'Del Sistema', email: 'admin@del-sistema.com', tel: '12345678'})
        .expectStatus(200)
        .expectBody({
          success: true
        })
        .end();
    });

    it('should not create a user with invalid username', () => {
      return endpoint()
        .send({ username: 'a', password: 'admin'})
        .expectStatus(400)
        .expect((res, body, next) => {
          expect(body).to.have.all.keys(['error']);
          next();
        })
        .end();
    });
  });

  describe('GET /user', () => {
    const endpoint = () => hippie(server)
      .json()
      .get('/api/user');

    it('should return Not Allowed with no token', () => {
      return endpoint()
        .expectStatus(401)
        .expect((res, body, next) => {
          expect(body).to.have.all.keys(['error']);
          next();
        })
        .end();
    });

    it('should return user data', () => {
      return endpoint()
        .qs({ token: VALID_TOKEN })
        .expectStatus(200)
        .expectBody({
          username: 'admin'
        })
        .end();
    });
  });

  describe('PUT /user', () => {
    const endpoint = () => hippie(server)
      .json()
      .put('/api/user');

    it('should return Not Allowed with no token', () => {
      return endpoint()
        .expectStatus(401)
        .expect((res, body, next) => {
          expect(body).to.have.all.keys(['error']);
          next();
        })
        .end();
    });

    it('should return user data', () => {
      return endpoint()
        .send({
          token: VALID_TOKEN,
          password: 'new password'
        })
        .expectStatus(200)
        .expectBody({
          success: true
        })
        .end();
    });
  });
});
