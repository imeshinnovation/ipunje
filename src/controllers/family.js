const { family } = require('../libs/loadmodels');
const helpers = require('../libs/helpers')

module.exports = {
    // CREATE
    add: async (body) => {
        const { name_family, congregation } = body
        if(name_family.length > 1){
            const fl = new family()
            fl.name_family = name_family
            fl.congregation = congregation
            fl.date_record = helpers.daterecord()
            fl.save()
            return { 'msg': 'OK'}
        } else {
            return { 'msg': 'Error' }
        }
    },
    // READ
    count: async (id) => {
        const count = await family.find({_id: id}).count()
        return count
    },
    all: async () => {
        const all = await family.find({}).sort({name_family: 1}).lean()
        return all
    },
    one: async (id) => {
        const one = await family.findOne({ _id: id }).lean()
        return one
    },
    // UPDATE
    upd: async (body) => {
        const { id, name_family, congregation } = body
        const datos = {
            name_family, congregation
        }
        const upd = await family.updateOne({ _id: id }, datos)
        return upd
    },
    // DELETE
    del: async (body) => {
        const del = await family.findByIdAndDelete({ _id: body.id })
        return { 'msg': 'OK' }
    }
}