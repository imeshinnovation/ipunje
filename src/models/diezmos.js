const mongoose = require("mongoose")

const { Schema } = mongoose;

const diezmoSchema = new Schema({
    code: { type: String  },
    id_pastor: { type: String },
    nombre_pastor: { type: String },
    producto_financiero: { type: Number },
    ingreso: { type: String },
    aporte: { type: String },
    cuenta_contable: { type: Number },
    fecha_registro: { type: String },
    image64: { type: String },
    date_record: { type: String }
})

module.exports = mongoose.model("diezmos", diezmoSchema, "diezmos")