const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const { Schema } = mongoose;

const Tarea = new Schema ({
    item: { type: Number , trime:true },
    nombre: { type: String , trime:true , require: true },
    observacion: { type: String , trime:true , require: true },
    desde: { type: String , trime:true , require: true },
    realizado: { type: String , trime:true , require: true },
    responsable: { type: String , trime:true , require: true },
    cc: { type: String , trime:true , require: true },
    estado: { type: Number , time: true , default: 0},
    proyecto: { type: ObjectId , ref: 'Proyecto' , require: true }
}, {timestamps: true}
);

module.exports = mongoose.model('Tarea' , Tarea); 