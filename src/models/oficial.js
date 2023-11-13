const mongoose = require("mongoose")


const { Schema } = mongoose;

const oficialSchema = new Schema({
    names: { type: String },
    cargo: { type: String },
    rut: { type: String },
    date_record: { type: String }
})

module.exports = mongoose.model("oficial", oficialSchema, "oficial")