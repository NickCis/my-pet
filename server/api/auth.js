// XXX: ver una mejor manera de manejar la configuracion
import config from 'config';
import jwt from 'jsonwebtoken';

export function post(req, res) {
  // TODO: usar scape (mirar libreria de pg para eso)
  const sql = `SELECT * from users where username = '${req.params.username}' AND password = '${req.params.password}'`;

  req.db.doQuery(sql)
    .then(result => {
      if (result.rows.length > 0) {
        res.status(200);
        const token = jwt.sign({
          username: result.rows[0].username
        }, config.get('SessionSecret'));
        return res.send({token});
      }

      res.status(401);
      res.send({error: {description: 'error', code: 401}});
    })
    .catch(err => {
      console.log('error');
      res.status(500);
      res.send({error: err});
    });
}
