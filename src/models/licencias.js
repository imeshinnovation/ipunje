const mongoose = require("mongoose")


const { Schema } = mongoose;

const licenciaSchema = new Schema({
    licencia: { type: String },
    description: { type: String },
    status: { type: Number, default: 0 },
    date_record: { type: String }
})


module.exports = mongoose.model("licencias", licenciaSchema)