const { pcontables } = require('../libs/loadmodels');
const helpers = require('../libs/helpers')

module.exports = {
    all: async () => {
        const all = await pcontables.find({}).sort({ code_name: 1 }).lean()
        return all
    },
    one: async (id) => {
        const all = await pcontables.findOne({ '_id': id }).lean()
        return all
    },
    add: async (body) => {
        try {
            await pcontables.findOneAndUpdate({ '_id': body.id }, body, { upsert: true, new: true, setDefaultsOnInsert: true })
            return { 'msg': 'OK'}
        } catch (err) {
            return { 'msg': 'Error' }
        }
    },
    del: async (body) => {
        const { id } = body
        const del = await pcontables.findByIdAndDelete({ _id: id })
        return { 'msg': 'OK' }
    }
}