import jwt from 'jsonwebtoken';

/** Funcion middleware para usar junto a Restify.
 * Se tiene que usar de la siguiente manera:
 *   server.use(middleware(secret))
 *
 * Agrega propiedad `session` a request.
 *
 * @param secret: Secreto a usar
 * @return middleware para Restify
 */
export function middleware(secret) {
  return (req, res, next) => {
    req.session = {};

    if(!req.params.token)
      return next();

    jwt.verify(req.params.token, secret, (err, session) => {
      if(!err)
        req.session = session;
      next();
    });
  };
}
