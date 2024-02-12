const mongoose = require("mongoose")


const { Schema } = mongoose;

const traspasoSchema = new Schema({
    producto: { type: String },
    cantidad: { type: Number },
    sucursal_origen: { type: String },
    sucursal_destino: { type: String },
    description : { type: String },
    autorization: { type: String },
    date_record: { type: String }
})


module.exports = mongoose.model("traspaso", traspasoSchema, "traspaso")