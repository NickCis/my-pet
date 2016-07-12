import ApiError from '../error';

export function post(req, res, next) {
  next.ifError(req.params.validationError({
    required: ['pet1', 'pet2', 'result'],
    properties: {
      pet1: {type: 'integer'},
      pet2: {type: 'integer'},
      result:{type:'integer'}
    }
  }));

  // TODO: usar scape (mirar libreria de pg para eso)
  const sql = `INSERT into likes (pet1,pet2, result) VALUES ('${req.params.pet1}', '${req.params.pet2}', '${req.params.result}')`;
  req.db.doQuery(sql)
    .then(() => res.json(200, {success: true}))
    .catch(err => res.json(500, {error: err}))
    .then(() => next());
}

export function get(req, res, next) {
  //TODO validar esta mierda
  const sql = `SELECT result FROM likes WHERE pet1 = ${req.headers.pet1} AND pet2 = ${req.headers.pet2}`;
  req.db.doQuery(sql)
    .then(result => {
      if (result.rows.length > 0) {
        const papita = {
          result: result.rows[0].result
        };
        return res.json(200, papita);
      }
      res.send(new ApiError(401, 'No hay like todavia'));

    })
    .catch(err => res.send(new ApiError(500, err)))
    .then(() => next());
}
