import Ajv from 'ajv';
import ApiError from './error';

/** Funcion middleware para usar junto a Restify.
 * Se tiene que usar de la siguiente manera:
 *   server.use(middleware())
 *
 * Agrega metodo `validationError(schema)` a request.params, este
 *   metodo devuelve un error si no se valida correctamente el
 *   schema con request.params. Usa `ajv` para validar.
 *
 * @return middleware para Restify
 */
export function middleware() {
  return (req, res, next) => {
    req.params.validationError = schema => {
      const ajv = new Ajv({allErrors: true});
      if (ajv.validate(schema, req.params))
        return undefined;
      return new ApiError(400, ajv.errorsText());
    };

    next();
  };
}
