const { traspaso } = require('../libs/loadmodels');
const helpers = require('../libs/helpers')

module.exports = {
    // CREATE
    add: async (body) => {
        try {
            body.date_record = helpers.daterecord()
            await traspaso.create(body)
            return { 'msg': 'OK' }
        } catch {
            return { 'msg': 'NO' }
        }
    },
    // READ
    count: async (id) => {
        const count = await traspaso.find({}).count()
        return count
    },
    all: async () => {
        const all = await traspaso.find({}).sort({ producto: 1 }).lean()
        return all
    },
    one: async (body) => {
        const one = await traspaso.findOne({ _id: body.id }).lean()
        return one
    },
    // UPDATE
    upd: async (body) => {
        const upd = await traspaso.updateOne({ _id: body.id }, body)
        return upd
    },
    // DELETE
    del: async (body) => {
        const del = await traspaso.findByIdAndDelete({ _id: body.id })
        return { 'msg': 'OK' }
    }
}