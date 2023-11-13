const { sucursal } = require('../libs/loadmodels');

module.exports = {
    allsucursales: async () => {
        const allsucursales = await sucursal.find({}).sort({ 'nombre_sucursal': 1 }).lean()
        return allsucursales
    },
    onesucursal: async (id) => {
        const onesuc = await sucursal.findOne({_id: id})
        return JSON.parse(JSON.stringify(onesuc))
    },
    addsucursal: async (body) => {
        const { nombre_sucursal, pastor, direccion, telefono, tipo_sucursal, latitud, longitud } = body
        const nsuc = new sucursal()
        nsuc.nombre_sucursal = nombre_sucursal
        nsuc.pastor = pastor
        nsuc.direccion = direccion
        nsuc.telefono = telefono
        nsuc.tipo_sucursal = tipo_sucursal
        nsuc.latitud = latitud
        nsuc.longitud = longitud
        nsuc.save()
        return nsuc
    },
    updsucursal: async (body) => {
        const { id, nombre_sucursal, pastor, direccion, telefono, tipo_sucursal, latitud, longitud } = body
        const datos = {
            nombre_sucursal, pastor, direccion, telefono, tipo_sucursal, latitud, longitud
        }
        const usuc = await sucursal.updateOne({_id: id}, datos)
        return usuc
    },
    del: async (body) => {
        await sucursal.findByIdAndDelete({ _id: body.id })
        return { 'msg': 'OK' }
    },
}