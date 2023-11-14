const { pcontables } = require('../libs/loadmodels');
const helpers = require('../libs/helpers');
const { isValidObjectId } = require('mongoose');

module.exports = {
    all: async () => {
        const all = await pcontables.find({}).sort({ code_name: 1 }).lean()
        return all
    },
    count: async () => {
        const all = await pcontables.find({}).count()
        return all
    },
    one: async (id) => {
        const all = await pcontables.findOne({ '_id': id }).lean()
        return all
    },
    add: async (body) => {
        const id = body.id
        delete body.id
        try {
            if(isValidObjectId(id)){
                await pcontables.findOneAndUpdate({ _id: id }, body, { upsert: true, new: true, setDefaultsOnInsert: true })
            } else {
                await pcontables.create(body)
            }
            return { 'msg': 'OK'}
        } catch (err) {
            console.log(err);
            return {'error': err.codeName + ' ' + err }
        }
    },
    del: async (body) => {
        const { id } = body
        const del = await pcontables.findByIdAndDelete({ _id: id })
        return { 'msg': 'OK' }
    }
}