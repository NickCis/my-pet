import ApiError from '../error';

function max_date(date1, date2){
  if (date1 < date2) return date2;
  else return date1;
}

export function get(req, res, next) {
  next.ifError(req.hasDBError());
  next.ifError(req.hasSessionError());
  next.ifError(req.params.validationError({
    required: ['id']
  }));

  const sql = `SELECT papita.id, papita.name,papita.owner,papita.birthdate, papita.breed,
              owner.id as owner_id, owner.username as owner_username, owner.name as owner_name,
              owner.surname as owner_surname, owner.email as owner_email, owner.tel as owner_tel,
              matches.like1_datetime, matches.like2_datetime FROM
                (SELECT l1.datetime as like1_datetime, l2.datetime as like2_datetime, l1.pet2 as cand
                FROM likes as l1
                INNER JOIN likes l2 ON l1.pet1 = l2.pet2
                WHERE l1.result = 1 AND l2.result = 1
                AND l1.pet1 = l2.pet2 AND l1.pet2 = l2.pet1
                AND (l1.pet1 = ${req.params.id} OR l2.pet2 = ${req.params.id})) matches
              LEFT JOIN pets as papita ON matches.cand = papita.id LEFT JOIN users as owner ON papita.owner = owner.id`;

  req.db.doQuery(sql)
    .then(result => {
      var matches = result.rows.map(current => {
        return {
          id : current.id,
          owner : current.owner,
          birthdate : current.birthdate,
          breed : current.breed,
          name : current.name,
          datetime : max_date(current.like1_datetime, current.like2_datetime),
          owner: Object.keys(current)
            .filter(k => /^owner_/.test(k))
            .reduce((r, k) => {
              r[k.substr('owner_'.length)] = current[k];
              return r;
            }, {})
        };
      });
      res.send(200, matches);
    })
    .catch(err => res.send(new ApiError(500, err)))
    .then(() => next());

}
