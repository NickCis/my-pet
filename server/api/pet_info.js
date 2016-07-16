export function get(req, res, next) {
  const sql = `SELECT * FROM pet_information`;
  req.db.doQuery(sql)
    .then(result => {
      res.send(200, result.rows);
    })
    .catch(err => res.json(500, {error: err}))
    .then(() => next());
}
