'use strict'

var mongoose = require('mongoose'); // cargo el modulo
var Schema = mongoose.Schema;  // cargo el objeto de Schema

var ProjectSchema = Schema({
    name: String,
    description:String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

module.exports = mongoose.model('Project', ProjectSchema);
//projects --> guarda los documentos en la coleccion