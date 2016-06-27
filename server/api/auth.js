import jwt from 'jsonwebtoken';
import ApiError from '../error';

export function post(req, res, next) {
  // TODO: usar scape (mirar libreria de pg para eso)
  const sql = `SELECT * from users where username = '${req.params.username}' AND password = '${req.params.password}'`;

  req.db.doQuery(sql)
    .then(result => {
      if (result.rows.length > 0) {
        const token = jwt.sign({
          username: result.rows[0].username
        }, req.config.get('SessionSecret'));
        return res.json(200, {token});
      }

      res.send(new ApiError(401, 'Credenciales erroneas'));
    })
    .catch(err => res.send(new ApiError(500, err)))
    .then(() => next());
}
