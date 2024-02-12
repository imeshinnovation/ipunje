const mongoose = require("mongoose")


const { Schema } = mongoose;

const inventarioSchema = new Schema({
    producto: { type: String },
    cantidad: { type: Number },
    costo_unitario: { type: Number },
    costo_total: { type: Number },
    description : { type: String },
    status: { type: String },
    producto_contable: { type: String},
    sucursal: { type: String },
    factura_fisica: { type: String },
    date_record: { type: String }
})


module.exports = mongoose.model("inventario", inventarioSchema, "inventario")