import ApiError from '../error';

export const PasswordSchema = {
  type: 'string',
  minLength: 5
};

export function post(req, res, next) {
  next.ifError(req.hasDBError());
  next.ifError(req.params.validationError({
    required: ['username', 'password', 'name', 'surname', 'email', 'tel'],
    properties: {
      username: {type: 'string', minLength: 5},
      password: PasswordSchema,
      name: { type: 'string' },
      surname: { type: 'string' },
      email: { type: 'string', format: 'email' },
      tel: { type: 'string' }
    }
  }));
  const username = req.params.username.toLowerCase();
  const sql = `INSERT into users (username, password, name, surname, email, tel) VALUES ('${username}', '${req.params.password}', '${req.params.name}', '${req.params.surname}', '${req.params.email}', '${req.params.tel}')`;
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
    properties: {
      password: PasswordSchema,
      name: { type: 'string' },
      surname: { type: 'string' },
      email: { type: 'string', format: 'email' },
      tel: { type: 'string' }
    }
  }));

  let values = [];
  [ 'password', 'name', 'surname', 'email', 'tel' ].forEach(k => {
    if(req.params[k])
      values.push(`${k} = '${req.params[k]}'`);
  });

  if(!values.length)
    return next(ApiError(400, 'Se debe querer cambiar algun valor!'));

  const sql = `UPDATE users SET ${values.join(' ')} WHERE username = '${req.session.username}'`;
  req.db.doQuery(sql)
    .then(() => res.json(200, {success: true}))
    .catch(err => res.json(500, {error: err}))
    .then(() => next());
}
