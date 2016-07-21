export const PasswordSchema = {
  type: 'string',
  minLength: 5
};

export function post(req, res, next) {
  next.ifError(req.hasDBError());
  next.ifError(req.params.validationError({
    required: ['username', 'password'],
    properties: {
      username: {type: 'string', minLength: 5},
      password: PasswordSchema
    }
  }));

  const username = req.params.username.toLowerCase();
  const sql = `INSERT into users (username, password) VALUES ('${username}', '${req.params.password}')`;
  req.db.doQuery(sql)
    .then(() => res.json(200, {success: true}))
    .catch(err => res.json(500, {error: err}))
    .then(() => next());
}

export function get(req, res, next) {
  next.ifError(req.hasDBError());
  next.ifError(req.hasSessionError());

  res.json(200, {username: req.session.username});
  next();
}

export function put(req, res, next) {
  next.ifError(req.hasDBError());
  next.ifError(req.hasSessionError());
  next.ifError(req.params.validationError({
    required: ['password'],
    properties: {
      password: PasswordSchema
    }
  }));

  const sql = `UPDATE users SET password = '${req.params.password}' WHERE username = '${req.session.username}'`;
  req.db.doQuery(sql)
    .then(() => res.json(200, {success: true}))
    .catch(err => res.json(500, {error: err}))
    .then(() => next());
}
