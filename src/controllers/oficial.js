const { oficial } = require('../libs/loadmodels');
const helpers = require('../libs/helpers')

module.exports = {
    all: async () => {
        const all = await oficial.find({}).sort({'cargo': 1}).lean()
        return all
    },
    one: async (id) => {
        const all = await oficial.findOne({ _id: id })
        return all
    },
    add: async (body) => {
        const { names, cargo, rut } = body
        if(names.length > 1){
            const ofi = new oficial()
            ofi.names = names
            ofi.cargo = cargo
            ofi.rut = rut
            ofi.date_record = helpers.daterecord()
            ofi.save()
            return { 'msg': 'OK'}
        } else {
            return { 'msg': 'Error' }
        }
    },
    del: async (body) => {
        const del = await oficial.findByIdAndDelete({ _id: body.id })
        return { 'msg': 'OK' }
    }
}