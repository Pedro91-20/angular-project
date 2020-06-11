'use strict'

var mongoose = require('mongoose'); // objeto en la variable mongoose
var app = require('./app'); // accedo al directorio de node_modules, luego a la carpeta de app y cargo el modulo correspondiente
var port = 3700; // puerto del servidor

mongoose.Promise = global.Promise; // le indico que es una promesa
mongoose.connect('mongodb://localhost:27017/portafolio') // coneccion a la base de datos (le paso una url de mongoDB)
        .then(() => { // como es una promesa mostramos el siguiente mensaje cuando se conecte, y  cogemos el error
           console.log("Conexión a la base de datos establecida con éxito de la hostia...");
           
           //Creacion del servidor
           app.listen(port,() =>{
            console.log("Servidor corriendo correctamente en la url: localhost:3700");
           });


        })
        .catch(err => console.log(err));