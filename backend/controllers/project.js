'use strict'

var Project = require('../models/project'); 
//const project = require('../models/project');
var fs = require('fs');

var controller = {   // controladores

    home:function(req,res){
        return res.status(200).send({
            message:'Soy la home'
        });
    },

    test:function(req, res){
        return res.status(200).send({
            message:"Soy el método o accion test del controlador de project"

        });
    },

    saveProject:function(req,res){ //  metodo para guardar nuevos documentos
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => { 
            if(err) return res.status(500).send({message:'Error al guardar el documento.'});

            if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

            return res.status(200).send({project:projectStored});

        });

        /*
        return res.status(200).send({
            project : project,
            message: "Metodo saveProject"
        })
        */
       
    },

    getProject:function(req, res){  // Metodo para listar proyectos
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: 'El proyecto no existe.'}); // si el id pasado es igual a null me devuelve este error

        
        Project.findById(projectId, (err, project) =>{// buscar un objeto segun la id pasada
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(!project) return res.status(404).send({message: 'El proyecto no existe.'});
 
            return res.status(200).send({
                project
            });
        }); 
    },

    getProjects:function(req,res){ // metodo que devuelve listado de proyectos

        Project.find({}).sort('year').exec((err, projects) => {  // metodo que busca los proyectos a los objetos tipo proyectos y los ordena con sort por el año

            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(!projects) return res.status(404).send({message:'No hay proyectos para mostrar.'});

            return res.status(200).send({projects});  // si la respuesta es positiva devuelve una variable con una array de objetos de todos los proyectos
        });
    },

    updateProject: function(req,res){  // metodo que permite actualizar la base de datos de Mongo
        
        var projectId = req.params.id; // capturamos el valor que llega por la url
        var update = req.body;  // recogemos el body de la peticion, objeto completo con los datos actualizados de nuestro proyecto
    
        Project.findByIdAndUpdate(projectId, update,{new:true}, (err,  projectUpdated) => { // metodo que permite actualizar la base de datos buscando el id que se le ha pasado
            
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!projectUpdated) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

            return res.status(200).send({
                project:projectUpdated
            });
        });
    },

    deleteProject: function(req, res){ // metodo que elimina los proyectos
        var projectId = req.params.id; // recogemos el parametro id

        Project.findByIdAndRemove(projectId, (err, projectRemoved) =>{  // metodo que permite enviar un id, buscarlo en la base de datos y eliminarlo

            if(err) return res.status(500).send({message:'No se ha podido borrar el proyecto'});

            if(!projectRemoved) return res.status(400).send({message: 'No se puede eliminar ese proyecto'});

            return res.status(200).send({
                project: projectRemoved
            });
        });
    },

    uploadImage:function(req, res){  // metodo que nos permite subir una imagen a este proyecto
        var projectId = req.params.id;  // capturamos la variable 
        var fileName = 'Imagen no subida...';

        if(req.files){ // si existen la req este metodo
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.'); // divido el array en dos elementos
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

                Project.findByIdAndUpdate(projectId,{image:fileName},{new:true}, (err, projectUpdated) =>{
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'})
    
                    if(!projectUpdated) return res.status(404).send({message: 'El proyect no existe y no se ha asignado la imagen'});
                
    
                    return res.status(200).send({
                        project: projectUpdated
                    });
                });

            }else{

                fs.unlink(filePath, (err) =>{
                    return res.status(200).send({message: 'La extensión no es valida'});

                });
            }

        }else{
            return res.status(200).send({
                message: fileName
            });
        }
    }
};

module.exports = controller;
