import pg from 'pg';
import ApiError from './error';

/** Realiza una query.
 * @param client: connexion a la db
 * @param sql
 * @return [Promise]
 */
function doQuery(client, sql) {
  return new Promise((rs, rj) => {
    client.query(sql, (err, result) => {
      if (err)
        return rj(err);

      result.client = client;
      rs(result);
    });
  });
}

/** Conectarse a una base datos.
 * @param config { host, database, user, password, port }
 * @return [Promise] resultado de la operacion
 */
function connectDB(config) {
  // TODO: soportar scaping!
  return new Promise((rs, rj) => {
    const pool = new pg.Pool(config);
    pool.doQuery = doQuery.bind(pool, pool);
    pool.connect(err => {
      if (err)
        return rj(err);
      rs(pool);
    });
  });
}

/** Funcion middleware para usar junto a Restify.
 * Se tiene que usar de la siguiente manera:
 *   server.use(middleware(config))
 *
 * Agrega propiedad `db` a request.
 *
 * @param config: { host, database, user, password, port }
 * @param cb: callback que se ejecuta cuando se haya terminado de conectar a la db
 * @return middleware para Restify
 */
export function middleware(config, cb) {
  if (typeof cb !== 'function')
    cb = () => {};

  let db;
  connectDB(config)
    .then(client => {
      db = client;
      cb(undefined, client);
    })
    .catch(err => cb(err));

  return (req, res, next) => {
    req.hasDBError = () => {
      if(!db)
        return new ApiError(500, 'No se puede conectar a la db');
    };
    req.db = db;
    next();
  };
}

/** Para inicializar la base de datos
 * @param config { host, database, user, password, port }
 * @return [Promise] resultado de la operacion
 */
export function create(config) {
  let promise = connectDB(config)
    .then(client => {
      return { client };
    });

  [
    // TODO: La base de datos se tiene que crear manualmente
    // `CREATE DATABASE "${config.database}"`,
    `CREATE TABLE IF NOT EXISTS "users" (
          id serial NOT NULL,
          username varchar(40) NOT NULL,
          password varchar(40) NOT NULL,
          name varchar(40) NOT NULL,
          surname varchar(40) NOT NULL,
          email varchar(40) NOT NULL,
          tel varchar(40) NOT NULL,
          PRIMARY KEY (id),
          UNIQUE(username)
      )`,
    `CREATE TABLE IF NOT EXISTS "pets" (
            id serial NOT NULL,
            name varchar(40) NOT NULL,
            owner integer references users(id) ON DELETE CASCADE,
            birthdate date NOT NULL,
            breed varchar(40) NOT NULL,
            images_length integer NOT NULL,
            PRIMARY KEY (id)
        )`,
    `CREATE TABLE IF NOT EXISTS "pet_images" (
            id serial NOT NULL,
            id_pet integer references pets(id) ON DELETE CASCADE,
            image text,
            PRIMARY KEY (id)
        )`,
    `CREATE TABLE IF NOT EXISTS "likes" (
            pet1 integer references pets(id) ON DELETE CASCADE,
            pet2 integer references pets(id) ON DELETE CASCADE,
            result integer NOT NULL,
            datetime timestamp default current_timestamp,
            PRIMARY KEY (pet1,pet2)
        )`,
    `CREATE TABLE IF NOT EXISTS "pet_information" (
            id serial NOT NULL,
            breed varchar(40) NOT NULL,
            info text NOT NULL,
            image_url varchar(255),
            PRIMARY KEY (id)
        );
        INSERT INTO pet_information ( breed, info, image_url) VALUES ('Boxer', 'Si tiene o desea tener un boxer, puede confiar en que cuidará de su propiedad y que lo esperará con una arrolladora bienvenida. \nEsta raza fue desarrollada en Alemania tomando como base perros tipo mastines, el boxer fue empleado para peleas con toros y finalmente fue cruzado con el bulldog. Era poco conocido fuera de Alemania hasta después de la Segunda Guerra Mundial, Cuando los soldados se los llevaron a sus hogares. Es inteligente y fácil de entrenar, se ha empleado en tareas militares y policiales. \nDe cuerpo compacto, pero poderoso, de pelaje brillante y pegado al cuerpo. Se puede encontrar en colores gamuza, atigrado y varias tonalidades de rojo, con manchas blancas. Suele cortársele la cola. \nSe recomienda un entrenamiento constante desde temprana edad y manejado por un adulto fuerte. Confiable con los niños y sumamente leal a su familia, es excelente guardián y controla a los intrusos de la misma manera que el bullmastiff. Puede ser agresivo con otros perros.',
        '/img/breed/boxer.jpg');
        INSERT INTO pet_information ( breed, info, image_url) VALUES ('Dalmata' , 'Los orígenes son poco claros, pero en la Europa del siglo XIX su tarea principal era correr junto a los carruajes, para proteger a los viajeros. El dálmata por su buen temperamento e inteligencia y servicio, es la mascota del los cuerpos de bomberos en Estados Unidos. \nEsta raza elegante tiene las líneas delicadas y musculosas del pointer, con el que puede tener algún parentesco. Nace con pelaje blanco, pero van apareciéndole manchas negras o de color hígado bien definidas durante el primer año. Las uñas pueden ser del color de las manchas o de color blanco. \nFiestero, enérgico y protector, adora a los niños "de 8 años en adelante", por lo que puede ser un buen perro niñero. Se requiere de un buen entrenador para adiestrarlo por su gran sensibilidad su entrenamiento necesita de paciencia y un manejo suave, pero firme, para explotarle todas su aptitudes requiere de un amo experimentado. Por su carácter y energía física, si no es bien ejercitado y entrenado, será un perro problema "destructivo" y toma de control. \nAcicalado: \nEsta raza pierde mucho pelo, por lo que el cepillado diario es esencial. Báñelo cuando se necesite, también cortarle sus uñas regularmente.',
        '/img/breed/dalmata.jpg');
        INSERT INTO pet_information ( breed, info, image_url) VALUES ('Pastor Aleman' , 'Formado para el pastoreo, parece que este perro puede ser entrenado para realizar cualquier trabajo. Tareas policiales, de búsqueda y rescate, militares y de guía: la raza es próspera en servicios. \nEsta raza fue estandarizada en Alemania en la década de 1980, la raza fue importada a los Estados Unidos a comienzos del siglo XX, y adquirió popularidad fundamentalmente debido a las películas de Rin Tin Tin. Ahora realiza múltiples tareas. \nEl bellísimo ovejero alemán tiene pelaje doble espeso que puede ser negro con manchas tostadas, gamuzas o grises. También vienen otros colores. \nInteligente y confiado, es tanto amado como temido. Vigilante y con tendencia a la agresividad hacia otros perros, requiere un manejo firme, bondadoso y constante por parte de un adulto experimentado. Propenso a ser reservado, hay que saber ganarse su amistad, pero desde ese momento la lealtad del animal queda garantizada.',
        '/img/breed/pastor_aleman.jpg');
        INSERT INTO pet_information ( breed, info, image_url) VALUES ('San bernardo','El san bernardo es admirado en todo el mundo por sus proezas de rescate en los Alpes suizos. Su coraje y habilidad son narradas en leyendas desde hace más de doscientos años. \nSe cree que el san bernardo desciende del moloso, linaje original de los mastines llevados a los Alpes por los romanos hace unos 2,000 años. La raza lleva el nombre de bernardo de Mentón, fundador de un hospicio construido en un remoto cruce alpino en Suiza hace casi mil años para refugio de quienes viajaran por la zona. Los monjes bernardinos criaron el perro para desarrollar sus habilidades de guardián, guía y tiro. No se sabe cuándo se le empezó a emplear en actividades de rescate, aunque probablemente haya sido durante el siglo XVII. A esta raza se le atribuye el mérito de haber salvado la vida de más de 2,500 personas; Barry, un san bernardo nacido en 1800, rescató a cuarenta personas en doce años de trabajo.',
        '/img/breed/san_bernardo.jpg');
        INSERT INTO pet_information ( breed, info, image_url) VALUES ('Bobtail','Si tiene la paciencia y el tiempo necesario para dedicarse a ejercitar y a cuidar a un viejo pastor inglés, se verá recompensado por el amor de un compañero fiel y bellísimo. \nEl viejo pastor inglés es conocido también como bobtail (cola cortada), y fue criado para cuidar ganado, tanto ovino como vacuno, en el West Country de Inglaterra. \nDe gran cuerpo y musculoso se caracteriza por su ladrido grave, estentóreo y repicante. Su pelaje desgreñado no es enrulado y se puede encontrar en colores gris, grisáceo, azul o blue merle, con o sin manchas blancas. \nEs juguetón y tiene gran inteligencia, como aprende rapido es necesario entrenarlo cuando es joven y manejable. Si el viejo pastor inglés se aburre se torna destructivo.',
        '/img/breed/bobtail.jpg');
        INSERT INTO pet_information ( breed, info, image_url) VALUES ('Caniche','El nombre inglés del caniche, poodle, deriva de la palabra alemana "puddelin" ("chapotear en el agua", y el nombre de caniche en francés significa perro pato. Estos nombres hacen ver el propósito de esta raza; un perro de cobranza de presas acuáticas. El caniche desde el siglo XVIII, fue empleado en Alemania y Francia como perro de caza, y en Rusia para tirar de carretillas lecheras. El caniche miniatura es original de Francia y llega a ser la mascota de la aristocracia europea. Con gran facilidad para aprender, agilidad y aspecto cómico, son las estrellas de circos y de espectáculos caninos. \nEn esta raza se reconocen cuatro variedades, grande "estándar", mediano, enano y toy. La grande fue la primera y de ahí se desarrollaron las otras siguientes. De paso firme y apenas tocando el piso, con un trote saltarín, en colores blanco, negro, crema, marrón, albaricoque, plata , y azul, todos en colores uniformes.' ,
        '/img/breed/caniche.jpg');
        INSERT INTO pet_information ( breed, info, image_url) VALUES ('Britanico de pelo corto','El British Shorthair o Británico de pelo corto a alcanzado altas cuotas de popularidad en los últimos años gracias a su carácter afable y a su cara de muñeco de peluche; de grandes ojos y mejillas mofletudas. La variedad más conocida es la azul, semejante a la Chartreux,  aunque se reconocen al menos 17 colores de manto.',
        '/img/breed/britanico_de_pelo_corto.jpg');
        INSERT INTO pet_information ( breed, info, image_url) VALUES ('Himalayo','El gato Himalayo es el resultado del cruce ideado por el hombre entre gatos Persas y Siameses. En la actualidad, con el modelo bien establecido, nos encontramos con bellos ejemplares cuya morfología es la del gato Persa y el color, sin embargo, es él del Siamés. \nEn Europa se le considera como una subraza del Persa mientras que en Estados Unidos, las principales asociaciones felinas tratan al Himalayo como raza propia.',
        '/img/breed/himalayo.jpg');
        INSERT INTO pet_information ( breed, info, image_url) VALUES ('Beagle','El beagle es encantador, gusta de retozar al aire libre y no pierde oportunidad para jugar. Esta raza adora a los niños, le gusta la compañía humana y en la cacería es un excelente cazador. \nSe utilizaban jaurías de beagles para cazar liebres por olfato. Su nombre proviene de la palabra celta que significa pequeño, beag, o en francés de begueule que significa garganta. Esta raza en la actualidad es más grande que sus antepasados que podían ser transportados en bolsas o alforjas. \nDe cuerpo musculoso y de pelaje resistente al agua, se puede encontrar en combinado de colores blanco, rojo, tostado, negro, limón y azul. \nEs alerta y se debe manejar con firmeza, ya que posee una fuerte personalidad y esto a veces lo hace difícil para entrenar. Casi nunca es agresivo y siempre esta de buen humor, pero si no se ejercita, se aburrirá y se tornará destructivo. Si se queda solo por mucho tiempo ladra en exceso o hará travesuras.',
        '/img/breed/beagle.jpg');
        INSERT INTO pet_information ( breed, info, image_url) VALUES ('Basset Hound','El rostro solemne de este adorable sabueso contradice su naturaleza vivaz. Confiable compañero de caza, es también una mascota deliciosa para las familias con niños pequeños. \nLa mayoría de las razas basset son originarias de Francia (bas significa "abajo" en francés), pero el basset hound fue desarrollado en gran Bretaña hace apenas cien años. Por su habilidad para concentrarse en un olor en particular se ha ganado el respeto de los cazadores. \nTiene patas cortas y macizas, con pliegues sueltos de piel. El cuerpo es robusto y con forma de barril. El color del pelo puede ser una combinación de blanco con tostado, negro y limón. Las orejas largas son aterciopeladas. \nTiene buen carácter y es amable con los niños. Puede ser obcecado y es difícil de entrenar para la convivencia básica. \nAcicalado: \nNo pierde mucho pelo y es suave y corto. Cepíllelo con cepillo de cerdas duras y báñelo con shampoo seco sólo cuando haga falta. Es importante limpiarle las orejas semanalmente.',
        '/img/breed/basset_hound.jpg');
        `,

  ].forEach(sql => {
    promise = promise.then(result => {
      return result.client.doQuery(sql);
    });
  });

  return promise;
}
