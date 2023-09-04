const Tarea = require('../modelos/Tarea');
const { errorHandler } = require('../helpers/dberrorHandler');

const _ = require('lodash');

//Crea el tarea
exports.create = (req, res) => {
    //console.log('Tarea control : req.body: ' , req.body)
    const tarea = new Tarea(req.body);
    tarea.save((err, tarea) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({tarea});
    })

}

//Lista los tareas
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy :['estado'];

    //console.log("Id recibido en list de tareas" , req.params.id)
    //console.log("Proyecto de tarea", )
    id = req.params.id;
    Tarea.find({ proyecto: id })
        .populate("proyecto")
        .sort([[sortBy, order]])
        .exec((err, tarea) => {
            if (err) {
                return res.status(400).json({
                    error: "Tareas no found"
                })
            }
            res.json(tarea);
        })
}

exports.listTarea = async (req, res) => {
    const tareaFound = await Tarea.findById(req.params.id);
    if (!tareaFound) return res.status(204).json();
    //console.log('respuesta desde listOne: ', tareaFound);
    return res.json(tareaFound);
}

exports.editar = async (req, res) => {
    //console.log('datos del parametro en editar: ', req.params.id)
    //console.log('datos del body en editar: ', req.body)
    const tareaUpdate = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!tareaUpdate) return res.status(204).json()
    //console.log('datos editados en editar: ', tareaUpdate);
    res.json(tareaUpdate)
}

//Borrar tarea
exports.remove = (req, res) => {
    let tarea = req.tarea
    tarea.remove((err, deletedTarea) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "La tarea se a eliminado"
        })
    })
}

//Obtencion del Id
exports.tareaById = (req, res, id, next) => {
    Tarea.findById(id)
        .populate("proyecto")
        .exec((err, tarea) => {
            if (err || !tarea) {
                return res.status(400).json({
                    error: "La tarea no existe"
                });
            }
            req.tarea = tarea;
            next();
        })
}

module.exports = exports;