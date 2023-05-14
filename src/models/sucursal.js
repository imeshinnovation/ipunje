const mongoose = require("mongoose")

const { Schema } = mongoose;

const sucursalSchema = new Schema({
    nombre_sucursal: { type: String },
    pastor: { type: String  },
    direccion: { type: String },
    telefono: { type: String },
    tipo_sucursal: { type: String },
    latitud: { type: String },
    longitud: { type: String },
    date_record: { type: String }
})

module.exports = mongoose.model("sucursal", sucursalSchema, "sucursal")