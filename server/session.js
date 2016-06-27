import jwt from 'jsonwebtoken';
import ApiError from './error';

/** Funcion middleware para usar junto a Restify.
 * Se tiene que usar de la siguiente manera:
 *   server.use(middleware(secret))
 *
 * Agrega propiedad `session` a request.
 *
 * Agrega metodo `hasSessionError` a request, este
 *   metodo devuelve un error si no hay una sesion
 *   con usuario.
 *
 * @param secret: Secreto a usar
 * @return middleware para Restify
 */
export function middleware(secret) {
  return (req, res, next) => {
    req.hasSessionError = () => {
      if (req.session.username)
        return undefined;
      return new ApiError(401, 'No conectado');
    };

    req.session = {};

    if (!req.params.token)
      return next();

    jwt.verify(req.params.token, secret, (err, session) => {
      if (!err)
        req.session = session;
      next();
    });
  };
}
