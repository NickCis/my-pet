import ApiError from '../error';

export function get(req, res, next) {
  next.ifError(req.params.validationError({
    required: ['id']
  }));

  const sql = `SELECT * FROM pets WHERE id = ${req.params.id}`;
  req.db.doQuery(sql)
    .then(result => {
      if (result.rows.length > 0) {
        const myrrope = result.rows[0];

        const sql2 = `SELECT * FROM pets WHERE id <> ${myrrope.id}
                      AND id NOT IN (SELECT pet2 from likes WHERE pet1 = ${myrrope.id})
                      AND breed = '${myrrope.breed}'
                      AND owner <> ${myrrope.owner}`;

        req.db.doQuery(sql2)
          .then(result => {
            if (result.rows.length > 0){
              return res.json(200, result.rows)
            }
            res.send(200, []);
          })
          .catch(err => res.send(new ApiError(500, err)))
          .then(() => next());

      }
    })
    .catch(err => res.send(new ApiError(500, err)))

    .then(() => next());
}
