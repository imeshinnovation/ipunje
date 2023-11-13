const { licencias } = require('../libs/loadmodels');
const helpers = require('../libs/helpers')

module.exports = {
    all: async () => {
        const all = await licencias.find({}).sort({'licencia': 1}).lean()
        return all
    },
    add: async (body) => {
        const { licencia, description } = body
        if(licencia.length > 1){
            const nl = new licencias()
            nl.licencia = licencia
            nl.description = description
            nl.date_record = helpers.daterecord()
            nl.save()
            return { 'msg': 'OK'}
        } else {
            return { 'msg': 'Error' }
        }
    },
    del: async (body) => {
        const { id } = body
        const del = await licencias.findByIdAndDelete({ _id: id })
        return { 'msg': 'OK' }
    }
}