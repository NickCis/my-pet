export function post(req, res, next) {
  next.ifError(req.params.validationError({
    required: ['username', 'password'],
    properties: {
      username: {type: 'string', minLength: 5},
      password: {type: 'string', minLength: 5}
    }
  }));

  // TODO: usar scape (mirar libreria de pg para eso)
  const sql = `INSERT into users (username, password) VALUES ('${req.params.username}', '${req.params.password}')`;
  req.db.doQuery(sql)
    .then(() => res.json(200, {success: true}))
    .catch(err => res.json(500, {error: err}))
    .then(() => next());
}

export function get(req, res, next) {
  next.ifError(req.hasSessionError());

  res.json(200, {username: req.session.username});
  next();
}
