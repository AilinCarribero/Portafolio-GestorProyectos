const Proyecto = require('../modelos/proyecto');
const { errorHandler } = require('../helpers/dberrorHandler');

const formidable = require('formidable');
const _ = require('lodash');

//Editar proyecto
exports.editar = async (req , res) => {
    //console.log('datos: ' , req.params.id)
    //console.log('datos: ' , req.body)
    const proyectoUpdate = await Proyecto.findByIdAndUpdate(req.params.id , req.body , {new: true})
    if(!proyectoUpdate) return res.status(204).json()
    //console.log('datos editados en editar: ' , proyectoUpdate);
    res.json(proyectoUpdate)
}

//Crea el proyecto
exports.create = (req , res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req , ( err , fields ) => {
        if(err) {
            return res.status(400).json({
                error: "error al crear proyecto"
            })
        }
        const {responsable , cc , cliente , observaciones} = fields;
        const proyecto = new Proyecto(fields);

        proyecto.save((err , result) => {   
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(result);
        })

    })
}

//Lista los proyectos
exports.list = (req , res) => {
    let order = req.query.order ? req.query.order: 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy: 'cc';

    Proyecto.find()
        .sort([['estado' , '1'] , ['cliente'] , [sortBy , order] ])
        .exec((err , proyecto) => {
             if (err) {
                return res.status(400).json({
                    error: "Proyectos no found"
                })
            }
            res.json(proyecto);
        })
}

exports.listOne = async (req , res) => {
    const proyectFound = await Proyecto.findById(req.params.id);
    if(!proyectFound) return res.status(204).json();
    //console.log('respuesta desde listOne: ', proyectFound);
    return res.json(proyectFound);
}

//Borrar proyecto
exports.remove = (req , res) => {
    let proyecto = req.proyecto
    proyecto.remove((err , deletedProyecto) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "El proyecto se a eliminado"
        })
    })
}

//Obtencion del Id
exports.proyectoById = (req , res, next , id) => {
    Proyecto.findById(id).exec((err , proyecto) => {
        if (err || !proyecto) {
            return res.status(400).json({
                error: "El proyecto no existe"
            });
        }
        req.proyecto = proyecto;
        next();
    })
}

module.exports = exports;