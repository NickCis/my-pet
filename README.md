# MyPet

Aplicación para la materia Taller de Proyecto de la FiUBA.

El código del servidor se encuentra en `server` y el del cliente en `client`.

Para instalar:

```
$ npm install
```

Para compilar la interfaz:

```
$ npm run webpack
```

Si se quiere que recompile la interfaz al ir modificandola:

```
$ npm run webpack-watch
```

Para correr el servidor:

```
$ npm run start
```

Para inicializar la base de datos:

```
$ npm run setup
```

**Nota:** Se debe antes crear la base de datos *my-pet* y configurar el archivo `config/default.yaml`

## Swagger

En `/swagger/` esta el editor de API *Swagger* para poder ir haciendo pruebas y especificando la API.

El archivo por defecto lo lee de `/public/swagger/specs/default.yaml`.

## TODO

Usar el `webpack-dev-server` para hacer *hot reloading*.
