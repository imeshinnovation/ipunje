const mongoose = require("mongoose")


const { Schema } = mongoose;

const userSchema = new Schema({
    names: { type: String  },
    lastnames: { type: String },
    typedoc: { type: String },
    numdoc: { type: String },
    nationality: { type: String },
    placeofbirth: { type: String },
    dateofbirth: { type: String },
    gender: { type: String },
    address: { type: String },
    phonenumber: { type: String },
    civilstatus: [{
        status: { type: String },
        namespouse: { type: String },
        numberchildren: { type: Number }
    }],
    scholarship: { type: String },
    occupation: { type: String },
    datewaterbaptism: { type: String },
    citybaptism: { type: String },
    shepherdbaptism: { type: String },
    holyspirit: { type: String },
    dateholyspirit: { type: String },
    positionsheld: { type: String },
    howmeetlord: { type: String },
    addnote: { type: String },
    photo:
    {
        filename: String,
        contentType: String
    },
    email: { type: String, unique: true }, 
    password: { type: String },
    roll: { type: Number },
    status: { type: Number, default: 0 },
    date_record: { type: String }
})


module.exports = mongoose.model("user", userSchema, "user")