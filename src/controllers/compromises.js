const { compromises } = require('../libs/loadmodels');
const helpers = require('../libs/helpers')

module.exports = {
    // CREATE
    add: async (body) => {
        try {
            await compromises.create(body)
            helpers.EnviarCorreo(body.my_email, "Nuevo Compromiso", `<h1>Hola ${body.my_name}</h1><h3>Creaste un Nuevo Compromiso para el día: ${body.date_compromise}<br><br>Con el Amigo - Visita: ${body.friend_name}<br><br>Motivo Razón del Compromiso: ${body.compromise}</h3>`)
            return { 'msg': 'OK' }
        } catch {
            return { 'msg': 'NO' }
        }
    },
    // READ
    count: async (id) => {
        const count = await compromises.find({}).count()
        return count
    },
    all: async () => {
        const all = await compromises.find({}).sort({ status: 0 }).lean()
        return all
    },
    one: async (id) => {
        const one = await compromises.findOne({ _id: id }).lean()
        return one
    },
    // UPDATE
    upd: async (body) => {
        const upd = await compromises.updateOne({ _id: body.id }, body)
        const datac = await compromises.findOne({ _id: body.id })
        helpers.EnviarCorreo(datac.my_email, "Compromiso Actualizado", `<h1>Hola ${datac.my_name}</h1><h3>Actualizaste un Compromiso para el día: ${datac.date_compromise}<br><br>Con el Amigo - Visita: ${datac.friend_name}<br><br>Motivo Razón del Compromiso: ${datac.compromise}</h3>`)
        return upd
    },
    // DELETE
    del: async (body) => {
        const del = await compromises.findByIdAndDelete({ _id: body.id })
        return { 'msg': 'OK' }
    }
}