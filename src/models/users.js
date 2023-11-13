const mongoose = require("mongoose")


const { Schema } = mongoose;

const userSchema = new Schema({
    id_family: { type: String },
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
    civilstatus: { type: String },
    placefamily: { type: String },
    scholarship: { type: String },
    congregation: { type: String },
    occupation: { type: String },
    datewaterbaptism: { type: String },
    citybaptism: { type: String },
    shepherdbaptism: { type: String },
    holyspirit: { type: String },
    positionsheld: { type: String },
    howmeetlord: { type: String },
    addnote: { type: String },
    photo: { type: String },
    email: { type: String, unique: true }, 
    date_record: { type: String }
})


module.exports = mongoose.model("user", userSchema, "user")