export function post(req, res) {
  // TODO: usar scape (mirar libreria de pg para eso)
  const sql = `INSERT into users (username, password) VALUES ('${req.params.username}', '${req.params.password}')`;

  req.db.doQuery(sql)
    .then(() => {
      res.status(200);
      res.send({success: true});
    })
    .catch(err => {
      res.status(500);
      res.send({error: err});
    });
}

export function get(req, res) {
  if (!req.session.username) {
    res.status(401);
    return res.send({error: {description: 'No conectado', code: 401}});
  }

  res.status(200);
  res.send({username: req.session.username});
}
