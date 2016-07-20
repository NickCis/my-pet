import ApiError from '../error';

export function post(req, res, next) {
  next.ifError(req.hasDBError());
  next.ifError(req.hasSessionError());
  next.ifError(req.params.validationError({
    required: [ 'name', 'birthdate', 'breed', 'images' ],
    properties: {
      name: { type: 'string' },
      owner: { type: 'integer' },
      birthdate : {type: 'string' },
      breed : { type : 'string' },
      images : {
        type : 'array',
        minItems: 1,
        items: { type: 'string' }
      }
    }
  }));

  const sql = `INSERT into pets (name, owner, birthdate, breed, images_length) VALUES (
    '${req.params.name}',
    (SELECT id FROM users WHERE username = '${req.session.username}' ),
    '${req.params.birthdate}',
    '${req.params.breed}',
    ${req.params.images.length}
  ) RETURNING id`;

  req.db.doQuery(sql)
    .then(result => {
      if(result.rows.length < 1)
        return Promise.reject('Db Error');

      const id = result.rows[0].id;
      let returnValue = {
        ...req.params,
        id
      };

      delete returnValue['validationError'];
      delete returnValue['images'];

      res.json(200, returnValue);

      return Promise.all(req.params.images.map(img => {
        const sql = `INSERT into pet_images (id_pet, image) VALUES (${id}, '${img}')`;
        return req.db.doQuery(sql);
      }));
    })
    .catch(err => res.send(new ApiError(500, err)))
    .then(() => next());
}

export function get(req, res, next) {
  next.ifError(req.hasDBError());
  const sql = `SELECT * FROM pets WHERE id = ${req.params.id}`;
  req.db.doQuery(sql)
    .then(result => {
      return res.json(200, result.rows);
    })
    .catch(err => res.send(new ApiError(500, err)))
    .then(() => next());
}

export function getPetsByUser(req, res, next) {
  next.ifError(req.hasDBError());
  next.ifError(req.params.validationError({
    required: ['owner']
  }));
  const sql = `SELECT * FROM pets WHERE owner = ${req.params.owner}`;
  req.db.doQuery(sql)
    .then(result => {
        return res.json(200, result.rows);
      })
    .catch(err => res.send(new ApiError(500, err)))
    .then(() => next());
}

export function getPets(req, res, next) {
  next.ifError(req.hasDBError());
  next.ifError(req.hasSessionError());
  const sql = `SELECT * FROM pets WHERE owner = (SELECT id FROM users WHERE username = '${req.session.username}' )`;
  req.db.doQuery(sql)
    .then(result => {
        return res.json(200, result.rows);
      })
    .catch(err => res.send(new ApiError(500, err)))
    .then(() => next());
}

export function getImg(req, res, next) {
  next.ifError(req.hasDBError());
  const sql = `SELECT image FROM pet_images WHERE id_pet = ${req.params.id} order by id ASC LIMIT 1 OFFSET ${req.params.i}`;
  req.db.doQuery(sql)
    .then(result => {
      if(!result.rows.length)
        return res.send(404, '');

      const image = result.rows[0].image.replace(/^data:image\/(png|gif|jpe?g);base64,/,'');
      const buffer = new Buffer(image, 'base64');

      res.writeHead(200, {
        'Content-Length': buffer.length,
        'Content-Type': 'image/png'
      });

      res.write(buffer);
      res.end();
    })
    .catch(err => res.send(new ApiError(500, "no hay imagen")))
    .then(() => next());
}

export function del(req, res, next) {
  next.ifError(req.hasDBError());
  next.ifError(req.hasSessionError());
  next.ifError(req.params.validationError({
    required: ['id'],
    properties: {
      id: { type: ['string', 'integer'] }
    }
  }));

  const sql = `DELETE from pets where id = ${req.params.id} and owner in (
      SELECT id from users where username = '${req.session.username}'
    )`;

  req.db.doQuery(sql)
    .then(result => {
      res.json(200, { success: true });
    })
    .catch(err => res.send(new ApiError(500, "Error base de datos")))
    .then(() => next());

}
