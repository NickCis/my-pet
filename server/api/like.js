import ApiError from '../error';

export function post(req, res, next) {
  next.ifError(req.hasDBError());
  next.ifError(req.hasSessionError());

  next.ifError(req.params.validationError({
    required: ['pet1', 'pet2', 'result'],
    properties: {
      pet1: {type: ['integer', 'string']},
      pet2: {type: ['integer', 'string']},
      result: { type: ['integer', 'boolean'] }
    }
  }));

  const sql = `INSERT into likes (pet1, pet2, result) VALUES ('${req.params.pet1}', '${req.params.pet2}', '${req.params.result ? 1 : 0}')`;
  req.db.doQuery(sql)
    .then(result => {
      if (req.params.result != 1){ res.json(200, {success : true , match : false});}
      else{
        const sql2 = `SELECT result FROM likes WHERE pet1 = '${req.params.pet2}' AND pet2 = ${req.params.pet1}`;
        req.db.doQuery(sql2)
          .then(res2 => {
            if (res2.rows.length == 0) { res.json(200, {success : true , match : false});}
            if (res2.rows[0].result == 1) { res.json(200, {success : true , match : true});}
            else {res2.json(200, {success : true , match : false});}
          })
        }
    })
    .catch(err => res.json(500, {error: err}))
    .then(() => next());
}

export function get(req, res, next) {
  next.ifError(req.hasDBError());
  next.ifError(req.hasSessionError());

  const sql = `SELECT result, datetime FROM likes WHERE pet1 = ${req.params.pet1} AND pet2 = ${req.params.pet2}`;
  req.db.doQuery(sql)
    .then(result => {
      if (result.rows.length > 0) {
        const papita = {
          result: result.rows[0].result,
          datetime : result.rows[0].timestamp
        };
        return res.json(200, papita);
      }
      res.json(200,{});

    })
    .catch(err => res.send(new ApiError(500, err)))
    .then(() => next());
}

export function del(req, res, next) {
  next.ifError(req.hasDBError());
  next.ifError(req.hasSessionError());
  next.ifError(req.params.validationError({
    required: ['from', 'to'],
    properties: {
      from: {type: ['integer', 'string']},
      to: {type: ['integer', 'string']}
    }
  }));

  const sql = `DELETE from likes WHERE pet1 = ${req.params.from} AND pet2 = ${req.params.to}`;
  return req.db.doQuery(sql)
    .then(result => {
      res.json(200, { success: true });
    })
    .catch(err => res.json(new ApiError(500, err)))
    .then(() => nex());
}
