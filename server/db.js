import pg from 'pg';

/** Realiza una query.
 * @param client: connexion a la db
 * @param sql
 * @return [Promise]
 */
function doQuery(client, sql) {
  return new Promise((rs, rj) => {
    client.query(sql, (err, result) => {
      if (err)
        return rj(err);

      result.client = client;
      rs(result);
    });
  });
}

/** Conectarse a una base datos.
 * @param config { host, database, user, password, port }
 * @return [Promise] resultado de la operacion
 */
function connectDB(config) {
  // TODO: soportar scaping!
  return new Promise((rs, rj) => {
    const pool = new pg.Pool(config);
    pool.doQuery = doQuery.bind(pool, pool);
    pool.connect(err => {
      if (err)
        return rj(err);
      rs(pool);
    });
  });
}

/** Funcion middleware para usar junto a Restify.
 * Se tiene que usar de la siguiente manera:
 *   server.use(middleware(config))
 *
 * Agrega propiedad `db` a request.
 *
 * @param config: { host, database, user, password, port }
 * @param cb: callback que se ejecuta cuando se haya terminado de conectar a la db
 * @return middleware para Restify
 */
export function middleware(config, cb) {
  if (typeof cb !== 'function')
    cb = () => {};

  let db;
  connectDB(config)
    .then(client => {
      db = client;
      cb(undefined, client);
    })
    .catch(err => cb(err));

  return (req, res, next) => {
    req.db = db;
    next();
  };
}

/** Para inicializar la base de datos
 * @param config { host, database, user, password, port }
 * @return [Promise] resultado de la operacion
 */
export function create(config) {
  let promise = connectDB(config)
    .then(client => {
      return { client };
    });

  [
    // TODO: La base de datos se tiene que crear manualmente
    // `CREATE DATABASE "${config.database}"`,
    `CREATE TABLE IF NOT EXISTS "users" (
          id serial NOT NULL,
          username varchar(40) NOT NULL,
          password varchar(40) NOT NULL,
          PRIMARY KEY (id),
          UNIQUE(username)
      )`,
    `CREATE TABLE IF NOT EXISTS "pets" (
            id serial NOT NULL,
            name varchar(40) NOT NULL,
            owner integer references users(id),
            birthdate date NOT NULL,
            breed varchar(40) NOT NULL,
            image bytea,
            PRIMARY KEY (id)
        )`,
    `CREATE TABLE IF NOT EXISTS "likes" (
            pet1 integer references pets(id),
            pet2 integer references pets(id),
            result integer NOT NULL,
            PRIMARY KEY (pet1,pet2)
        )`,
    `CREATE TABLE IF NOT EXISTS "pet_information" (
            id serial NOT NULL,
            breed varchar(40) NOT NULL,
            info text NOT NULL,
            image bytea,
            PRIMARY KEY (id)
        )`,
  ].forEach(sql => {
    promise = promise.then(result => {
      return result.client.doQuery(sql);
    });
  });

  return promise;
}
