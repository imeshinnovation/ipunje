const Routes = require('express').Router()
const admins = require('../controllers/admins')
const roles = require('../controllers/roles')
const licencias = require('../controllers/licencias')
const oficial = require('../controllers/oficial')
const { EnviarCorreo } = require('../libs/helpers')
//const roles = require('../models/roles')

Routes.get('/', async (req, res) => {
    if(req.session.user){
        const user = await admins.all()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
	    res.render('pages/admon/index', { user, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/oficiales', async (req, res) => {
    if(req.session.user){
        const user = await admins.all()
        const oficiales = await oficial.all()
	    res.render('pages/admon/oficiales', { layout: false, user, oficiales })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/addoficial', async (req, res) => {
    if(req.session.user){
        const user = await admins.all()
	    res.render('pages/admon/addoficial', { layout: false, user })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/profile', async (req, res) => {
    if(req.session.user){
        const user = await admins.one(req.session.user)
        const myuser = user
	    res.render('pages/admon/profile', { myuser, user })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/addoficial', async (req, res) => {
    if(req.session.user){
	    const nofi = await oficial.add(req.body)
        res.json(nofi)
        
    } else {
        res.redirect('/login')
    }
})

Routes.post('/deloficial', async (req, res) => {
    if(req.session.user){
	    const dofi = await oficial.del(req.body)
        res.json(dofi)
        
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

Routes.get('/roll/:id?', async (req, res) => {
    try {
        const rolex = await roles.one(req.params.id)
	    res.json({ 'roll': rolex.roll })
    } catch {
        res.json({})
    }
})

Routes.get('/addroll', async (req, res) => {
    if(req.session.user){
        const rolex = await roles.all()
	    res.render('pages/admon/addroll', { layout: false, rolex })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/addroll', async (req, res) => {
    if(req.session.user){
	    const nroll = await roles.add(req.body)
        res.json(nroll)
        
    } else {
        res.redirect('/login')
    }
})

Routes.post('/delroll', async (req, res) => {
    if(req.session.user){
	    const droll = await roles.del(req.body)
        res.json(droll)
        
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

Routes.get('/addlicencia', async (req, res) => {
    if(req.session.user){
        res.render('pages/admon/addlicencia', { layout: false })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/addlicencia', async (req, res) => {
    if(req.session.user){
	    const nlic = await licencias.add(req.body)
        res.json(nlic)
        
    } else {
        res.redirect('/login')
    }
})

Routes.post('/dellicencia', async (req, res) => {
    if(req.session.user){
	    const dlic = await licencias.del(req.body)
        res.json(dlic)
        
    } else {
        res.redirect('/login')
    }
})


Routes.get('/addmember', async (req, res) => {
    if(req.session.user){
        const licen = await licencias.all()
        const rolex = await roles.all()
        res.render('pages/admon/addmember', { layout: false, licen, rolex })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/addmember', async (req, res) => {
    if(req.session.user){
        const adder = await admins.add(req.body)
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.redirect('/admon/')
    } else {
        res.redirect('/login')
    }
})

Routes.post('/savemember', async (req, res) => {
    if(req.session.user){
        const adder = await admins.update(req.body)
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.redirect('/admon/')
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

Routes.get('/editmember/:id?', async (req, res) => {
    if(req.session.user){
        const licen = await licencias.all()
        const rolex = await roles.all()
        const adder = JSON.parse(JSON.stringify(await admins.one(req.params.id)))
        res.render('pages/admon/editmember', { layout: false, adder, licen, rolex })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/delmember', async (req, res) => {
    if(req.session.user){
        const dmem = await admins.del(req.body)
        res.json(dmem)
    } else {
        res.redirect('/login')
    }
})

Routes.post('/upd', async (req, res) => {
    if(req.session.user){
        const umem = await admins.update(req.body)
        res.json(umem)
    } else {
        res.redirect('/login')
    }
})

module.exports = Routes