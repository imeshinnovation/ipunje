const mongoose = require("mongoose")


const { Schema } = mongoose;

const rollsSchema = new Schema({
    roll: { type: String },
    description: { type: String },
    grant: { type: String },
    date_record: { type: String }
})


module.exports = mongoose.model("rolls", rollsSchema)