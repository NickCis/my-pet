import ApiError from '../error';

export function post(req, res, next) {
  next.ifError(req.hasSessionError());
  next.ifError(req.params.validationError({
    required: ['name','birthdate','breed'],
    properties: {
      name: {type: 'string'},
      owner: {type: 'integer'},
      birthdate : {type: 'string'},
      breed : {type:'string'}
    }
  }));
  let sql
  if (req.params.owner){
    sql = `INSERT into pets (name,owner,birthdate,breed) VALUES ('${req.params.name}', '${req.params.owner}', '${req.params.birthdate}','${req.params.breed}')`;
  }else{
    sql = `INSERT into pets (name,owner,birthdate,breed) VALUES ('${req.params.name}', (SELECT id FROM users WHERE username = '${req.session.username}' ), '${req.params.birthdate}','${req.params.breed}')`;
  }
  req.db.doQuery(sql)
    .then(() => res.json(200, {success: true}))
    .catch(err => res.json(500, {error: err}))
    .then(() => next());
}

export function get(req, res, next) {
  const sql = `SELECT * FROM pets WHERE id = ${req.headers.id}`;
  req.db.doQuery(sql)
    .then(result => {
      if (result.rows.length > 0) {
        const papita = {
          id: result.rows[0].id,
          name: result.rows[0].name,
          birthdate: result.rows[0].birthdate,
          breed: result.rows[0].breed
        };
        return res.json(200, papita);
      }
      res.send(new ApiError(401, 'No existe pet con ese id'));

    })
    .catch(err => res.send(new ApiError(500, err)))
    .then(() => next());
}
