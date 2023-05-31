const Routes = require('express').Router()
const admins = require('../controllers/admins')
const roles = require('../controllers/roles')
const licencias = require('../controllers/licencias')
const { EnviarCorreo } = require('../libs/helpers')

Routes.get('/', async (req, res) => {
    if(req.session.user){
        const user = await admins.all()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
	    res.render('pages/admon/index', { user, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/members', async (req, res) => {
    if(req.session.user){
        const user = await admins.all()
	    res.render('pages/admon/members', { layout: false, user })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/roles', async (req, res) => {
    if(req.session.user){
        const rolex = await roles.all()
	    res.render('pages/admon/roles', { layout: false, rolex })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/licencias', async (req, res) => {
    if(req.session.user){
        const lics = await licencias.all()
	    res.render('pages/admon/licencias', { layout: false, lics })
    } else {
        res.redirect('/login')
    }
})


Routes.get('/addmember', async (req, res) => {
    if(req.session.user){
        res.render('pages/admon/addmember', { layout: false })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/addmember', async (req, res) => {
    if(req.session.user){
        const adder = await admins.add(req.body)
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.redirect('/admon/', { adder, myuser })
    } else {
        res.redirect('/login')
    }
})


Routes.get('/viewmember/:id?', async (req, res) => {
    if(req.session.user){
        const adder = JSON.parse(JSON.stringify(await admins.one(req.params.id)))
        res.render('pages/admon/viewmember', { layout: false, adder })
    } else {
        res.redirect('/login')
    }
})

module.exports = Routes