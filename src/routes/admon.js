const Routes = require('express').Router()
const admins = require('../controllers/admins')
const roles = require('../controllers/roles')
const licencias = require('../controllers/licencias')
const { EnviarCorreo } = require('../libs/helpers')

Routes.get('/', async (req, res) => {
    const user = await admins.all()
	res.render('pages/admon/index', { user })
})

Routes.get('/members', async (req, res) => {
    const user = await admins.all()
	res.render('pages/admon/members', { layout: false, user })
})

Routes.get('/roles', async (req, res) => {
    const rolex = await roles.all()
	res.render('pages/admon/roles', { layout: false, rolex })
})

Routes.get('/licencias', async (req, res) => {
    const lics = await licencias.all()
	res.render('pages/admon/licencias', { layout: false, lics })
})


Routes.get('/addmember', async (req, res) => {
    res.render('pages/admon/addmember', { layout: false })
})

Routes.post('/addmember', async (req, res) => {
    const adder = await admins.add(req.body)
    res.redirect('/admon/')
})

Routes.get('/viewmember/:id?', async (req, res) => {
    const adder = JSON.parse(JSON.stringify(await admins.one(req.params.id)))
    res.render('pages/admon/viewmember', { layout: false, adder })
})

module.exports = Routes