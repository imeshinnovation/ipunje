const mongoose = require("mongoose")


const { Schema } = mongoose;

const ccontablesSchema = new Schema({
    cuenta: { type: String },
    nombre: { type: String },
    nivel: { type: String },
    date_record: { type: String }
})

module.exports = mongoose.model("ccontables", ccontablesSchema, "ccontables")