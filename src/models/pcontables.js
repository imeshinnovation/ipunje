const mongoose = require("mongoose")
const { Schema } = mongoose;

const pcontablesSchema = new Schema({
    code_name: { type: String },
    description: { type: String },
    activo: { type: Number, Default: 0 },
    pasivo: { type: Number, Default: 0 },
    cuenta_activo: { type: String },
    cuenta_pasivo: { type: String },
    date_record: { type: String }
})

module.exports = mongoose.model("pcontables", pcontablesSchema, "pcontables")