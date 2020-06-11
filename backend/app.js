'use strict'

var express = require('express');  // cargo el modulo y tengo el objeto express para trabajar con el 
var bodyParser = require('body-parser'); // accede al directorio de node_modules, a la acrpeta de express o la de body_parer y carga el objeto

var app = express(); // ejecuto esta funcion

//Cargar archivos rutas
var project_routes = require('./routes/project');


// Configuracion de los middlewares (metodo que se ejecuta antes de ejecutar el resultado de la peticion)
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); // cualquier tipo de peticion que me llegue por el body de una peticion lo va a convertir en un json

//Configuracion del CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow', 'GET, POST, OPTIONS, PUT, DELETE");
    next();
});


// Cargar rutas
app.use('/api', project_routes);
//exportar
module.exports = app;