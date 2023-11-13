const { rolls } = require('../libs/loadmodels');
const helpers = require('../libs/helpers')

module.exports = {
    all: async () => {
        const all = await rolls.find({}).sort({'roll': 1}).lean()
        return all
    },
    one: async (grant) => {
        const all = await rolls.findOne({ grant: grant })
        return all
    },
    add: async (body) => {
        const { roll, description, grant } = body
        if(roll.length > 1){
            const rl = new rolls()
            rl.roll = roll
            rl.description = description
            rl.grant = grant
            rl.date_record = helpers.daterecord()
            rl.save()
            return { 'msg': 'OK'}
        } else {
            return { 'msg': 'Error' }
        }
    },
    del: async (body) => {
        const { id } = body
        const del = await rolls.findByIdAndDelete({ _id: id })
        return { 'msg': 'OK' }
    }
}