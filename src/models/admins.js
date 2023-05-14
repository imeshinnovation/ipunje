const mongoose = require("mongoose")


const { Schema } = mongoose;

const adminsSchema = new Schema({
    names: { type: String  },
    lastnames: { type: String },
    rut: { type: String },
    phonenumber: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    roll: { type: Number },
    licencia: { type: String },
    imagen64: { type: String },
    status: { type: Number, default: 0 },
    date_record: { type: String }
})


module.exports = mongoose.model("admins", adminsSchema, "admins")