# Por qué construir tu API pública con Firebase Cloud Functions: ¡Integrate con otros servicios!

Vamos a construir una biblioteca. Una aplicación donde los usuarios pueden buscar, añadir y eliminar sus libros favoritos. El frontend ya está construido y se encarga de autenticar usuarios, mostrar la información de los libros y darle permisos a los usuarios de modificar sus publicaciones.

Nuestro trabajo en este tutorial es construir una API que le permita a otras aplicaciones consultar los últimos y mejores libros de nuestro catálogo utilizando las herramientas de Firebase Cloud Functions. Recuerda que puedes aprender a construir el frontend de tu aplicación con Firebase en el [Curso de Firebase para la Web](https://platzi.com/cursos/firebase-web) de Platzi.

- DEMO de la API: [juandc-firebase-books-app.cloudfunctions.net/API_GET_BOOKS](https://us-central1-juandc-firebase-books-app.cloudfunctions.net/API_GET_BOOKS)
- Repositorio de la aplicación (Frontend y API): [github.com/juandc/firebase-books-app](https://github.com/juandc/firebase-books-app)

## Qué son las Cloud Functions HTTP

La plataforma de Firebase nos permite programar **Cloud Functions**: Cajitas de código que podemos ejecutar una y otra vez cuando se disparan algunos eventos de nuestras aplicaciones, por ejemplo:

* Cuando registramos o eliminamos un usuario.
* Si realizamos una compra o subimos una imagen.
* Cuando emitimos una factura o modificamos la base de datos en un lugar específico.

No solo eso. También podemos construir aplicaciones basadas en microservicios utilizando APIs y aprovechando que las Cloud Functions de Firebase también pueden procesar eventos HTTP. Es decir, podemos ejecutar nuestras funciones cuándo el frontend o algún otro cliente/servicio hace peticiones a nuestras URLs en busca de contenido e información.

Recuerda que las Cloud Functions nos ayudan a reaccionar para muchos otros tipos de eventos, por ejemplo, podemos detectar y bloquear contenido inapropiado cuando los usuarios suben imágenes a nuestra aplicación.

Utilizar estas funciones para construir APIs es solo una de las muchas formas en que podemos construir aplicaciones ([Curso de Express.js](https://platzi.com/express)). Además, es un ejemplo perfecto de las muchas utilidades que conseguimos gracias a la plataforma de Firebase.

Recuerda que puedes seguir este otro tutorial para crear un nuevo proyecto y crear tu API lo más rápido posible: [Crea una API con Firebase Cloud Functions](https://platzi.com/blog/crear-api-firebase-cloud-functions/). En este caso vamos a profundizar un poco más en cada etapa del proyecto. Te recomiendo leer ambos tutoriales. :wink:

## Iniciar el proyecto con Firebase

La herramienta `firebase-tools` nos ayuda a crear un proyecto de Node.js asociándolo a alguno de nuestros proyectos en Firebase. Solo debemos ejecutar el siguiente comando y seguir las instrucciones:

```bash
npm install -g firebase-tools
```

Firebase nos hará algunas preguntas sobre el código que queremos escribir, si queremos utilizar ESLint, TypeScript, entre otras. Elige la que más te guste.

Cuando las dependencias terminen de instalarse, vamos a ver que tenemos algunos nuevos archivos de configuración:

![Dependencias Firebase](https://pbs.twimg.com/media/D-KbrxeWwAAhES9.png)





En este proyecto vamos a escribir todo nuestro código en el archivo `functions/index.js`. Sin embargo, también vamos a necesitar algunas configuraciones extra en el archivo `firebase.json` si queremos mejorar las rutas de nuestra API.

## Respuestas simples de nuestra API

Antes de conseguir los datos reales de nuestra base de datos, vamos a crear nuestra primera función HTTP para probar el funcionamiento de nuestra API con una respuesta muy simple en formato JSON:

```js
const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.API_GET_BOOKS = functions.https.onRequest((request, response) => {
  response.json({
    message: 'Hello from Firebase!',
  });
});
```

Recuerda que debemos importar la librería `firebase-functions` (instalada por defecto cuando creamos el proyecto) y utilizarla para definir el comportamiento de nuestra API.

## Primer Deploy

Para probar que nuestra API funcione correctamente debemos pedirle a Firebase que suba nuestro proyecto con el siguiente comando:

```bash
firebase deploy
```

Muy sencillo, ¿verdad? :fire:

Ahora podemos entrar a consola de Firebase y buscar la sección de _”Functions”_ para encontrar la información de nuestra nueva función y copiar la URL con la que podemos probar la primera versión de la API.

![Firebase Functions](https://pbs.twimg.com/media/D-Kb0kNXkAAhRUf.jpg)

Si todo sale bien podremos entrar a la URL que Firebase creó para nuestra API y vamos a obtener el siguiente resultado:

```json
{
  "message": "Hello from Firebase!"
}
```

## Configuración de firebase-admin

Ahora que nuestra API funciona, podemos traer los datos que guardamos en la base de datos de Firebase y devolverlos en formato JSON. Vamos instalar la librería `firebase-admin` que nos ayudará a obtener nuestros datos y devolverlos por la API.

```bash
npm install --save firebase-admin
```

Lo primero que debemos hacer es añadir la configuración básica de Firebase:

```js
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const config = require('./firebase-config.json');

firebase.initializeApp({
  credential: firebase.credential.cert(config),
  databaseURL: 'https://<URL_BASE_DE_DATOS>.firebaseio.com',
});
```

Como puedes ver, debemos descargar un archivo llamado `firebase.config.json` con la información secreta de nuestra base de datos. Para esto, debemos ir a la sección de `Configuración > Cuentas de Servicio` y generar una nueva clave privada:

![Firebase Config](https://pbs.twimg.com/media/D-Kb2T1W4AEGOgY.png)

![Firebase SDK](https://pbs.twimg.com/media/D-Kb4U8X4AEULWs.png)

## Utilizando datos reales en la API

Es hora de utilizar `firebase-admin` para devolver los datos de nuestra aplicación, en este caso, la información de nuestros libros.

La aplicación de ejemplo para este tutorial utiliza **Firestore** como base de datos para guardar la información de los libros. Recuerda que cada aplicación es diferente; el código que vamos a necesitar para conseguir la información de la base de datos depende totalmente de la organización y la lógica de negocio.

El mejor lugar para aprender a crear aplicaciones web utilizando Firebase es el [Curso de Firebase Para Web](https://platzi.com/firebase-web) de Platzi :wink:.

En mi caso, este es el código que necesito para entregar la información de los libros:

```js
exports.API_GET_BOOKS = functions.https.onRequest((request, response) => {
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

const booksRef = firestore.collection('books');

booksRef.get()
  .then(docs => {
    const books = [];

    docs.forEach(doc => books.push({
      id: doc.id,
      title: doc.data().title,
      author: doc.data().author,
    }));

    return response.json({ books: books });
  })
  .catch(err => {
    return response.json({ error: err });
  })
});
```

Ahora sí, podemos volver a ejecutar el comando `firebase deploy` y probar nuestra aplicación en la URL que Firebase nos provee:

```json
{
  "data": [
    {
      "id": "0aKwwhILcjxqH0nmfjvD",
      "title": "Libro #1",
      "author": "Juan José García"
    },
    {
      "id": "6F9oXWNUvvdJZxPJyWm1",
      "title": "Libro #2,
      "author": "Don Jaimito"
    },
    {
      "id": "ApAUmVlWkMfjp50HK8I2",
      "title": "Libro #3",
      "author": "Spiderman"
    }
  ]
}
```

## Conclusión

Muchas aplicaciones construyen APIs públicas para integrarse con otros servicios. Gracias a las APIs públicas de Github miles de desarrolladoras y desarrolladores pueden construir aplicaciones para sus portafolios y otros servicios como Slack pueden notificarnos cuando creamos un Issue o Pull Request en nuestros proyectos.

La plataforma de Firebase tiene muchas herramientas asombrosas que nos ayudan a crear aplicaciones de forma rápida, sencilla y escalable. En esta caso, fue el turno de hablar del servicio de Cloud Functions y cómo nos permite añadir funcionalidades a nuestras aplicaciones sin necesidad de modificar el código base.

Te invito a tomar el [Curso de Firebase Cloud Functions](https://platzi.com/cursos/firebase-cloud) para descubrir todas las posibilidades que nos ofrecen estos servicios y cómo podemos utilizarlos para mejorar nuestras aplicaciones.

**¡#NuncaParesDeAprender!** :green_heart::nerd_face:

@[youtube](https://www.youtube.com/watch?v=Li1nCsnMaz4)
