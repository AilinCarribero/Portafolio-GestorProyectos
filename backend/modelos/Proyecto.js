const mongoose = require('mongoose');
const { Schema } = mongoose;

const Proyecto = new Schema({
    responsable: {type: String , trime:true , require: true},
    cc: {type: String , trime:true , require: true },
    cliente: {type: String , trime:true , require: true},
    observaciones: {type: String , trime:true },
    estado: { type: Number , time: true , default: 0},
}, {timestamps: true}
);

module.exports = mongoose.model('Proyecto' , Proyecto); 