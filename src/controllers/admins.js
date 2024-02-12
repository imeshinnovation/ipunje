const { admins } = require('../libs/loadmodels');
const { createHmac } = require('node:crypto');
const helpers = require('../libs/helpers')
const env = process.env
const secret = env.TKEY

module.exports = {
    all: async () => {
        const all = await admins.find({}).lean()
        return all
    },
    one: async (id) => {
        const oneus = await admins.findOne({_id: id}).lean()
        return oneus
    },
    byemail: async (mail) => {
        const oneus = await admins.findOne({email: mail})
        return oneus
    },
    verifymail: async (mail) => {
        const yer = await admins.findOne({email: mail})
        return yer
    },
    del: async (body) => {
        await admins.findByIdAndDelete({ _id: body.id })
        return { 'msg': 'OK' }
    },
    add: async (body) => {
        const { names, lastnames, rut, email, phonenumber, new_password, roll, licencia, image64 } = body
        if(new_password.length > 1){
            const adm = new admins()
            adm.names = names
            adm.lastnames = lastnames
            adm.rut = rut
            adm.email = email
            adm.phonenumber = phonenumber
            adm.password = createHmac('sha256', secret)
                .update(new_password)
                .digest('hex')
            adm.licencia = licencia
            adm.roll = roll
            adm.imagen64 = image64
            adm.date_record = helpers.daterecord()
            adm.save()
            return { 'msg': 'OK'}
        } else {
            return { 'msg': 'Error' }
        }
    },
    update: async (body) => {
        if(body.act == 1){
            body.password = createHmac('sha256', secret)
            .update(body.passwt)
            .digest('hex')
        }
        const upadm = await admins.updateOne({_id: body.id}, body)
        return upadm
    },
}