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
  const sql = `SELECT breed FROM pet_information`;
  req.db.doQuery(sql)
    .then(result => {
      var arr = [];
      console.log(result)
      for (var i = 0; i < result.rowCount; i++){
        arr.push(result.rows[i].breed);
      }
      res.send(200, arr);
    })
    .catch(err => res.json(500, {error: err}))
    .then(() => next());
}
