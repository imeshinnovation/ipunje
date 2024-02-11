const mongoose = require("mongoose")


const { Schema } = mongoose;

const compromiseSchema = new Schema({
    friend_name: { type: String },
    compromise: { type: String },
    date_compromise: { type: String },
    my_email: {type: String },
    my_name: {type: String },
    sucursal: { type: String },
    status: { type: String },
    date_record: { type: String }
})


module.exports = mongoose.model("compromise", compromiseSchema, "compromise")