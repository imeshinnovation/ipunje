const Routes = require('express').Router()
const users = require('../controllers/users')
const admins = require('../controllers/admins')
const codes = require('../controllers/codes')
const { EnviarCorreo } = require('../libs/helpers')

const sucursal = require('../controllers/sucursal')

Routes.get('/membresia', async (req, res) => {
    if(req.session.user){
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
	    res.render('pages/congregacional/membresia', { user, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/amigos', async (req, res) => {
    if(req.session.user){
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
	    res.render('pages/congregacional/amigos', { user, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/inventario', async (req, res) => {
    if(req.session.user){
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
	    res.render('pages/congregacional/inventario', { user, myuser })
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
    if(req.session.user){
        const sucursales = await sucursal.allsucursales()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
	    res.render('pages/congregacional/sucursales', { sucursales, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/addsucursal', async (req, res) => {
    if(req.session.user){
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        const pastores = await admins.all()
        res.render('pages/congregacional/addsucursal', { myuser, pastores })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/addsucursal', async (req, res) => {
    if(req.session.user){
        const nsuc = await sucursal.addsucursal(req.body)
        res.redirect('/congregacional/sucursales')
    } else {
        res.redirect('/login')
    }
})

Routes.get('/viewsucursal/:id?', async (req, res) => {
    if(req.session.user){
        const nsuc = await sucursal.onesucursal(req.params.id)
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.render('pages/congregacional/viewsucursal', { nsuc, myuser })
    } else {
        res.redirect('/login')
    }
})

module.exports = Routes