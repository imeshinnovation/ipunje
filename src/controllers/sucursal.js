const { sucursal } = require('../libs/loadmodels');

module.exports = {
    allsucursales: async () => {
        const allsucursales = await sucursal.find({}).lean()
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
    }
}