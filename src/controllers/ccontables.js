const { ccontables } = require('../libs/loadmodels');
const helpers = require('../libs/helpers')

module.exports = {
    all: async () => {
        const all = await ccontables.find({}).sort({ 'cuenta': 1 }).lean()
        return all
    },
    activos: async () => {
        const all = await ccontables.find({cuenta: { $regex: /^1/}}).sort({ 'cuenta': 1 }).lean()
        return all
    },
    cactivos: async () => {
        const all = await ccontables.find({cuenta: { $regex: /^1/}}).count()
        return all
    },
    pasivos: async () => {
        const all = await ccontables.find({cuenta: { $regex: /^2/}}).sort({ 'cuenta': 1 }).lean()
        return all
    },
    cpasivos: async () => {
        const all = await ccontables.find({cuenta: { $regex: /^2/}}).count()
        return all
    },
    one: async (cuenta) => {
        const all = await ccontables.findOne({ cuenta: cuenta })
        return all
    },
    add: async (body) => {
        const { nombre, cuenta, nivel } = body
        if (nombre.length > 1) {
            const cc = new ccontables()
            cc.nombre = nombre
            cc.cuenta = cuenta
            cc.nivel = nivel
            cc.date_record = helpers.daterecord()
            cc.save()
            return { 'msg': 'OK' }
        } else {
            return { 'msg': 'Error' }
        }
    },
    del: async (body) => {
        const { id } = body
        const del = await ccontables.findByIdAndDelete({ _id: id })
        return { 'msg': 'OK' }
    }
}