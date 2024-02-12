const { inventario } = require('../libs/loadmodels');
const helpers = require('../libs/helpers')

module.exports = {
    // CREATE
    add: async (body) => {
        try {
            body.date_record = helpers.daterecord()
            await inventario.create(body)
            return { 'msg': 'OK' }
        } catch {
            return { 'msg': 'NO' }
        }
    },
    // READ
    count: async (id) => {
        const count = await inventario.find({}).count()
        return count
    },
    all: async () => {
        const all = await inventario.find({}).sort({ names: 1 }).lean()
        return all
    },
    getcant: async (body) => {
        const all = await inventario.find({ _id: body.id }).select({cantidad:1, _id: 0}).lean()
        return all
    },
    allsucursal: async (body) => {
        const all = await inventario.find({ sucursal: body.sucursal }).select({ producto: 1, _id: 1 }).lean()
        return all
    },
    one: async (body) => {
        const one = await inventario.findOne({ _id: body.id }).lean()
        return one
    },
    // UPDATE
    upd: async (body) => {
        const upd = await inventario.updateOne({ _id: body.id }, body)
        return upd
    },
    // DELETE
    del: async (body) => {
        const del = await inventario.findByIdAndDelete({ _id: body.id })
        return { 'msg': 'OK' }
    },
    grantotalsuc: async (body) => {
        const suma = await inventario.aggregate([
            { $match: { "sucursal": body.sucursal }},
            { $group: { _id: null, total: { $sum: "$costo_total" }}}
        ])
        return suma
    }
}