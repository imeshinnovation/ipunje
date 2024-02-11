const mongoose = require("mongoose")


const { Schema } = mongoose;

const friendSchema = new Schema({
    names: { type: String },
    email: { type: String },
    phone: { type: String },
    sucursal: { type: String },
    date_record: { type: String }
})


module.exports = mongoose.model("friend", friendSchema, "friend")