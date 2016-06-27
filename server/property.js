/** Funcion middleware para usar junto a Restify.
 * Se tiene que usar de la siguiente manera:
 *   server.use(middleware(name, property))
 *
 * Agrega propiedad `name` con el valor de `property` a request.
 *
 * @param name: nombre de la propiedad
 * @param property: valor de la propiedad
 * @return middleware para Restify
 */
export function middleware(name, property) {
  return (req, res, next) => {
    req[name] = property;
    return next();
  };
}
