const mongoose = require("mongoose")

const { Schema } = mongoose;

const whiteSchema = new Schema({
    domain: { type: String  },
    status: { type: Number, default: 0 },
    date_record: { type: String }
})

module.exports = mongoose.model("whitelist", whiteSchema, "whitelist")