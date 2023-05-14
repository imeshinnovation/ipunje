const Routes = require('express').Router()
const users = require('../controllers/users')
const codes = require('../controllers/codes')
const { EnviarCorreo } = require('../libs/helpers')

const sucursal = require('../controllers/sucursal')

Routes.get('/membresia', async (req, res) => {
    if(req.user){
        const user = await users.allusers()
	    res.render('pages/congregacional/membresia', { user })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/amigos', async (req, res) => {
    if(req.user){
        const user = await users.allusers()
	    res.render('pages/congregacional/amigos', { user })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/inventario', async (req, res) => {
    if(req.user){
        const user = await users.allusers()
	    res.render('pages/congregacional/inventario', { user })
    } else {
        res.redirect('/login')
    }
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
    if(req.user){
        const sucursales = await sucursal.allsucursales()
	    res.render('pages/congregacional/sucursales', { sucursales })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/addsucursal', async (req, res) => {
    if(req.user){
        res.render('pages/congregacional/addsucursal')
    } else {
        res.redirect('/login')
    }
})

Routes.post('/addsucursal', async (req, res) => {
    if(req.user){
        const nsuc = await sucursal.addsucursal(req.body)
        res.redirect('/congregacional/sucursales')
    } else {
        res.redirect('/login')
    }
})

Routes.get('/viewsucursal/:id?', async (req, res) => {
    if(req.user){
        const nsuc = await sucursal.onesucursal(req.params.id)
        res.render('pages/congregacional/viewsucursal', { nsuc })
    } else {
        res.redirect('/login')
    }
})

module.exports = Routes