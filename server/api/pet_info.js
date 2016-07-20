export function get(req, res, next) {
  const sql = `SELECT * FROM pet_information`;
  req.db.doQuery(sql)
    .then(result => {
      res.send(200, result.rows);
    })
    .catch(err => res.json(500, {error: err}))
    .then(() => next());
}

export function getBreeds(req, res, next) {
  const sql = `SELECT distinct(breed) FROM pet_information`;
  req.db.doQuery(sql)
    .then(result => {
      res.json(200, result.rows.map(info => info.breed));
    })
    .catch(err => res.json(500, {error: err}))
    .then(() => next());
}
