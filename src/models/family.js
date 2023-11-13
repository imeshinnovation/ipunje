const mongoose = require("mongoose")


const { Schema } = mongoose;

const familySchema = new Schema({
    name_family: { type: String },
    congregation: { type: String },
    date_record: { type: String }
})


module.exports = mongoose.model("family", familySchema, "family")