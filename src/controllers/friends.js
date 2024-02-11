const { friends } = require('../libs/loadmodels');
const helpers = require('../libs/helpers')

module.exports = {
    // CREATE
    add: async (body) => {
        try {
            await friends.create(body)
            return { 'msg': 'OK' }
        } catch {
            return { 'msg': 'NO' }
        }
    },
    // READ
    count: async (id) => {
        const count = await friends.find({}).count()
        return count
    },
    all: async () => {
        const all = await friends.find({}).sort({ names: 1 }).lean()
        return all
    },
    one: async (id) => {
        const one = await friends.findOne({ _id: id }).lean()
        return one
    },
    // UPDATE
    upd: async (body) => {
        const upd = await friends.updateOne({ _id: body.id }, body)
        return upd
    },
    // DELETE
    del: async (body) => {
        const del = await friends.findByIdAndDelete({ _id: body.id })
        return { 'msg': 'OK' }
    }
}