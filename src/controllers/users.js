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
    countfamily: async (id) => {
        const cfamily = await users.find({ 'id_family': id }).count()
        return cfamily
    },
    group: async (id) => {
        const cfamily = await users.find({ 'id_family': id }).lean()
        return cfamily
    },
    oneuser: async (id) => {
        const oneus = await users.findOne({ _id: id })
        return oneus
    },
    verifymail: async (mail) => {
        const yer = await users.findOne({ email: mail })
        return yer
    },
    upd: async (body) => {
        const updu = await users.updateOne({ _id: body.id }, body)
        return updu        
    },
    addmember: async (body) => {
        //const {names, lastnames, typedoc, numdoc, nationality, placeofbirth, dateofbirth, gender, address, phonenumber, email, civilstatus, id_family, placefamily, scholarship, congregation, occupation, datewaterbaptism, citybaptism, sheperdbaptism, holyspirit, positionsheld, howmeetlord, addnote, image64} = body
        body.photo = body.image64
        const adu = await users.create(body)
        /*const adu = new users()
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
        adu.id_family = id_family
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
        adu.save()*/
        return adu
    },
    del: async (body) => {
        const { id } = body
        const del = await users.findByIdAndDelete({ _id: id })
        return { 'msg': 'OK' }
    }
}