import ApiError from '../error';

export function get(req, res, next) {
  next.ifError(req.params.validationError({
    required: ['id']
    }));

  const sql = `SELECT papita.id, papita.name,papita.owner,papita.birthdate, papita.breed FROM
              (SELECT pet2 as cand FROM likes WHERE pet1=${req.params.id} AND result=1 INTERSECT
               SELECT pet1 as cand FROM likes WHERE pet2=${req.params.id} AND result=1) matches
               LEFT JOIN pets as papita ON matches.cand = papita.id`;

  req.db.doQuery(sql)
    .then(result => {
        res.send(200, result.rows);
    })
    .catch(err => res.send(new ApiError(500, err)))
    .then(() => next());

}
