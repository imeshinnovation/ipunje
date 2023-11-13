const Routes = require('express').Router()
const users = require('../controllers/users')
const admins = require('../controllers/admins')
const path = require('path')
const family = require('../controllers/family')
const csv = require('csvtojson')
const { EnviarCorreo } = require('../libs/helpers')

const sucursal = require('../controllers/sucursal')

Routes.get('/membresia', async (req, res) => {
    if (req.session.user) {
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.render('pages/congregacional/membresia', { user, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/addmember', async (req, res) => {
    if (req.session.user) {
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        const sucursales = await sucursal.allsucursales()
        const family_all = await family.all()
        const paises = await csv().fromFile(path.join(__dirname + '../../libs/paises.csv'))
        res.render('pages/congregacional/addmember', { layout: false, user, myuser, paises, sucursales, family_all })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/addmembresia', async (req, res) => {
    if (req.session.user) {
        const adu = users.addmember(req.body)
        res.redirect("/congregacional/membresia")
    } else {
        res.redirect('/login')
    }
})

Routes.get('/viewmember/:id?', async (req, res) => {
    if (req.session.user) {
        const adder = JSON.parse(JSON.stringify(await users.oneuser(req.params.id)))
        res.render('pages/congregacional/viewmember', { layout: false, adder })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/editmember/:id?', async (req, res) => {
    if (req.session.user) {
        const adder = JSON.parse(JSON.stringify(await users.oneuser(req.params.id)))
        const paises = await csv().fromFile(path.join(__dirname + '../../libs/paises.csv'))
        const family_all = await family.all()
        const sucursales = await sucursal.allsucursales()
        res.render('pages/congregacional/editmember', { layout: false, adder, paises, family_all, sucursales })
    } else {
        res.redirect('/login')
    }
})


Routes.post('/delmember', async (req, res) => {
    if (req.session.user) {
        const delm = await users.del(req.body)
        res.json(delm)

    } else {
        res.redirect('/login')
    }
})


Routes.get('/amigos', async (req, res) => {
    if (req.session.user) {
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.render('pages/congregacional/amigos', { user, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/inventario', async (req, res) => {
    if (req.session.user) {
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.render('pages/congregacional/inventario', { user, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/countf/:id_family?', async (req, res) => {
    const countf = await users.countfamily(req.params.id_family).then((res) => {
        return res
    }).catch((err) => {
        res.json({ 'count': 0 })
    })
    res.json({ 'count': countf })
})


Routes.get('/grupof', async (req, res) => {
    const familiy_all = await family.all()
    res.render('pages/congregacional/groupf', { layout: false, familiy_all })
})

Routes.get('/addgroupf', async (req, res) => {
    const familiy_all = await family.all()
    const sucursales = await sucursal.allsucursales()
    res.render('pages/congregacional/addgroupf', { layout: false, familiy_all, sucursales })
})

Routes.get('/editgroupf/:id?', async (req, res) => {
    const famil = await family.one(req.params.id)
    const sucursales = await sucursal.allsucursales()
    res.render('pages/congregacional/editgroupf', { layout: false, famil, sucursales })
})

Routes.post('/updgroupf', async (req, res) => {
    if (req.session.user) {
        const adgf = await family.upd(req.body)
        res.json(adgf);
    } else {
        res.redirect('/login')
    }
})


Routes.post('/addgroupf', async (req, res) => {
    if (req.session.user) {
        const adgf = await family.add(req.body)
        res.json(adgf);
    } else {
        res.redirect('/login')
    }
})

Routes.get('/viewgroupf/:id?', async (req, res) => {
    if (req.session.user) {
        const view = JSON.parse(JSON.stringify(await family.one(req.params.id)))
        const sucursales = await sucursal.allsucursales()
        const userx = await users.group(view._id)
        res.render('pages/congregacional/viewgroupf', { layout: false, view, sucursales, userx })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/delgroupf', async (req, res) => {
    if (req.session.user) {
        const delf = await family.del(req.body)
        res.json(delf)

    } else {
        res.redirect('/login')
    }
})

Routes.get('/members', async (req, res) => {
    const user = await users.allusers()
    res.render('pages/congregacional/members', { layout: false, user })
})

Routes.get('/sucursales', async (req, res) => {
    if (req.session.user) {
        const sucursales = await sucursal.allsucursales()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.render('pages/congregacional/sucursales', { sucursales, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/addsucursal', async (req, res) => {
    if (req.session.user) {
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        const pastores = await admins.all()
        res.render('pages/congregacional/addsucursal', { myuser, pastores })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/addsucursal', async (req, res) => {
    if (req.session.user) {
        const nsuc = await sucursal.addsucursal(req.body)
        res.redirect('/congregacional/sucursales')
    } else {
        res.redirect('/login')
    }
})

Routes.get('/viewsucursal/:id?', async (req, res) => {
    if (req.session.user) {
        const nsuc = await sucursal.onesucursal(req.params.id)
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.render('pages/congregacional/viewsucursal', { nsuc, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/editsucursal/:id?', async (req, res) => {
    if (req.session.user) {
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        const adder = JSON.parse(JSON.stringify(await sucursal.onesucursal(req.params.id)))
        const pastores = await admins.all()
        res.render('pages/congregacional/editsucursal', { myuser, adder, pastores })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/updsucursal', async (req, res) => {
    if (req.session.user) {
        const nsuc = await sucursal.updsucursal(req.body)
        res.redirect('/congregacional/sucursales')
    } else {
        res.redirect('/login')
    }
})

Routes.post('/delsucursal', async (req, res) => {
    if (req.session.user) {
        const dsuc = await sucursal.del(req.body)
        res.json(dsuc)

    } else {
        res.redirect('/login')
    }
})

Routes.get('/dashinv', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        res.render('pages/congregacional/dashinv', { layout: false, user })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/agenda', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.render('pages/congregacional/agenda', { user, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/agendap', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        res.render('pages/congregacional/agendap', { layout: false, user })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/agendag', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        res.render('pages/congregacional/agendag', { layout: false, user })
    } else {
        res.redirect('/login')
    }
})



module.exports = Routes