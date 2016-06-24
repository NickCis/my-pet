export default function (req, res) {
  res.send({message: 'Holaaa! ' + req.params.nombre});
}
