const mongoose = require("mongoose")

const { Schema } = mongoose;

const codesSchema = new Schema({
    email: { type: String },
    code: { type: String  },
    date_record: { type: String }
})

module.exports = mongoose.model("codes", codesSchema, "codes")