const { users } = require('../libs/loadmodels');

module.exports = {
    allusers: async () => {
        const alluser = await users.find({}).lean()
        return alluser
    },
    count: async () => {
        const cnt = await users.find({}).count()
        return cnt
    },
    oneuser: async (id) => {
        const oneus = await users.findOne({_id: id})
        return oneus
    },
    verifymail: async (mail) => {
        const yer = await users.findOne({email: mail})
        return yer
    },
    addmember: async (body) => {
        const {names, lastnames, typedoc, numdoc, nationality, placeofbirth, dateofbirth, gender, address, phonenumber, email, civilstatus, grpfamily, placefamily, scholarship, congregation, occupation, datewaterbaptism, citybaptism, sheperdbaptism, holyspirit, positionsheld, howmeetlord, addnote, image64} = body
        const adu = new users()
        adu.names = names
        adu.lastnames = lastnames
        adu.typedoc = typedoc
        adu.numdoc = numdoc
        adu.nationality = nationality
        adu.placeofbirth = placeofbirth
        adu.dateofbirth = dateofbirth
        adu.gender = gender
        adu.address = address
        adu.phonenumber = phonenumber
        adu.email = email
        adu.civilstatus = civilstatus
        adu.grpfamily = grpfamily
        adu.placefamily = placefamily
        adu.scholarship = scholarship
        adu.congregation = congregation
        adu.occupation = occupation
        adu.datewaterbaptism = datewaterbaptism
        adu.citybaptism = citybaptism
        adu.shepherdbaptism = sheperdbaptism
        adu.holyspirit = holyspirit
        dateofbirth.positionsheld = positionsheld
        adu.howmeetlord = howmeetlord
        adu.addnote = addnote
        adu.photo = image64
        adu.save()
        return adu
    }
}