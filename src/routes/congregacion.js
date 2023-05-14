const Routes = require('express').Router()
const users = require('../controllers/users')
const codes = require('../controllers/codes')
const { EnviarCorreo } = require('../libs/helpers')

const sucursal = require('../controllers/sucursal')

Routes.get('/membresia', async (req, res) => {
    const user = await users.allusers()
	res.render('pages/congregacional/membresia', { user })
})

Routes.get('/amigos', async (req, res) => {
    const user = await users.allusers()
	res.render('pages/congregacional/amigos', { user })
})

Routes.get('/inventario', async (req, res) => {
    const user = await users.allusers()
	res.render('pages/congregacional/inventario', { user })
})

Routes.get('/grupof', async (req, res) => {
    const user = await users.allusers()
	res.render('pages/congregacional/groupf', { layout: false, user })
})

Routes.get('/members', async (req, res) => {
    const user = await users.allusers()
	res.render('pages/congregacional/members', { layout: false, user })
})

Routes.get('/sucursales', async (req, res) => {
    const sucursales = await sucursal.allsucursales()
	res.render('pages/congregacional/sucursales', { sucursales })
})

Routes.get('/addsucursal', async (req, res) => {
    res.render('pages/congregacional/addsucursal')
})

Routes.post('/addsucursal', async (req, res) => {
    const nsuc = await sucursal.addsucursal(req.body)
    res.redirect('/congregacional/sucursales')
})

Routes.get('/viewsucursal/:id?', async (req, res) => {
    const nsuc = await sucursal.onesucursal(req.params.id)
    console.log(nsuc)
    res.render('pages/congregacional/viewsucursal', { nsuc })
})

module.exports = Routes