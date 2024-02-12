const Routes = require('express').Router()
const users = require('../controllers/users')
const admins = require('../controllers/admins')
const path = require('path')
const family = require('../controllers/family')
const friends = require('../controllers/friends')
const compromises = require('../controllers/compromises')
const csv = require('csvtojson')
const { EnviarCorreo } = require('../libs/helpers')
const pcontables = require('../controllers/pcontables')
const sucursal = require('../controllers/sucursal')
const inventario = require('../controllers/inventario')
const traspaso = require('../controllers/traspaso')

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

Routes.get('/addcompromise', async (req, res) => {
    if (req.session.user) {
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        const mysucursal = await sucursal.mysucursal(myuser.names + ' ' + myuser.lastnames)
        const friend = await friends.all()
        res.render('pages/congregacional/addcompromise', { layout: false, user, myuser, friend, mysucursal })
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

Routes.post('/updmember', async (req, res) => {
    if (req.session.user) {
        const adu = await users.upd(req.body)
        res.json(adu)
    } else {
        res.redirect('/login')
    }
})

Routes.post('/addcompromise', async (req, res) => {
    if (req.session.user) {
        const adgc = await compromises.add(req.body)
        res.json(adgc);
    } else {
        res.redirect('/login')
    }
})

Routes.get('/editcompromise/:id?', async (req, res) => {
    const compromise = await compromises.one(req.params.id)
    res.render('pages/congregacional/editcompromise', { layout: false, compromise })
})

Routes.post('/updcompromise', async (req, res) => {
    if (req.session.user) {
        const adgc = await compromises.upd(req.body)
        res.json(adgc);
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

Routes.get('/grupoa', async (req, res) => {
    const friends_all = await friends.all()
    res.render('pages/congregacional/groupa', { layout: false, friends_all })
})

Routes.get('/addgroupf', async (req, res) => {
    const familiy_all = await family.all()
    const sucursales = await sucursal.allsucursales()
    res.render('pages/congregacional/addgroupf', { layout: false, familiy_all, sucursales })
})

Routes.get('/addgroupa', async (req, res) => {
    const friends_all = await friends.all()
    const sucursales = await sucursal.allsucursales()
    res.render('pages/congregacional/addgroupa', { layout: false, friends_all, sucursales })
})

Routes.get('/editgroupf/:id?', async (req, res) => {
    const famil = await family.one(req.params.id)
    const sucursales = await sucursal.allsucursales()
    res.render('pages/congregacional/editgroupf', { layout: false, famil, sucursales })
})

Routes.get('/editgroupa/:id?', async (req, res) => {
    const friend = await friends.one(req.params.id)
    const sucursales = await sucursal.allsucursales()
    res.render('pages/congregacional/editgroupa', { layout: false, friend, sucursales })
})

Routes.post('/updgroupf', async (req, res) => {
    if (req.session.user) {
        const adgf = await family.upd(req.body)
        res.json(adgf);
    } else {
        res.redirect('/login')
    }
})


Routes.post('/updgroupa', async (req, res) => {
    if (req.session.user) {
        const adga = await friends.upd(req.body)
        res.json(adga);
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

Routes.post('/addgroupa', async (req, res) => {
    if (req.session.user) {
        const adga = await friends.add(req.body)
        res.json(adga);
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

Routes.post('/delgroupa', async (req, res) => {
    if (req.session.user) {
        const delf = await friends.del(req.body)
        res.json(delf)

    } else {
        res.redirect('/login')
    }
})

Routes.post('/delcompromise', async (req, res) => {
    if (req.session.user) {
        const delc = await compromises.del(req.body)
        res.json(delc)

    } else {
        res.redirect('/login')
    }
})

Routes.get('/members', async (req, res) => {
    const user = await users.allusers()
    res.render('pages/congregacional/members', { layout: false, user })
})

Routes.get('/compromises', async (req, res) => {
    const compromise = await compromises.all()
    res.render('pages/congregacional/compromises', { layout: false, compromise })
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

Routes.get('/registroinv', async (req, res) => {
    if (req.session.user) {
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        const invent = await inventario.all()
        res.render('pages/congregacional/registroinv', { layout: false, user, myuser, invent })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/resumeninv', async (req, res) => {
    if (req.session.user) {
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        const invent = await inventario.all()
        const total = await inventario.grantotalsuc({sucursal: req.session.sucursal})
        res.render('pages/congregacional/resumeninv', { layout: false, user, myuser, invent, total })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/editregistro/:id?', async (req, res) => {
    if (req.session.user) {
        const data = await inventario.one(req.params)
        const pcontable = await pcontables.all()
        const sucursal = req.session.sucursal
        res.render('pages/congregacional/editregistro', { layout: false, data, pcontable, sucursal })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/viewregistro/:id?', async (req, res) => {
    if (req.session.user) {
        const user = await users.allusers()
        const regi = await inventario.one(req.params)
        res.render('pages/congregacional/viewregistro', { layout: false, user, regi })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/addregistro', async (req, res) => {
    if (req.session.user) {
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        const pcontable = await pcontables.all()
        const sucursal = req.session.sucursal
        res.render('pages/congregacional/addregistro', { layout: false, user, myuser, pcontable, sucursal })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/addregistro', async (req, res) => {
    if (req.session.user) {
        const dsuc = await inventario.add(req.body)
        res.json(dsuc)
    } else {
        res.redirect('/login')
    }
})

Routes.post('/updregistro', async (req, res) => {
    if (req.session.user) {
        const dsuc = await inventario.upd(req.body)
        res.json(dsuc)
    } else {
        res.redirect('/login')
    }
})

Routes.post('/delregistro', async (req, res) => {
    if (req.session.user) {
        const dsuc = await inventario.del(req.body)
        res.json(dsuc)
    } else {
        res.redirect('/login')
    }
})

Routes.get('/resumeninv', async (req, res) => {
    if (req.session.user) {
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        const invent = await inventario.all()
        const total = await inventario.grantotalsuc({sucursal: req.session.sucursal})
        res.render('pages/congregacional/resumeninv', { layout: false, user, myuser, invent, total })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/traspaso', async (req, res) => {
    if (req.session.user) {
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.render('pages/congregacional/traspaso', { user, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/traspinv', async (req, res) => {
    if (req.session.user) {
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        const trasp = await traspaso.all()
        res.render('pages/congregacional/traspinv', { layout: false, myuser, trasp })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/addtraspaso', async (req, res) => {
    if (req.session.user) {
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        const invent = await inventario.all()
        const sucur = await sucursal.allsucursales()
        res.render('pages/congregacional/addtraspaso', { layout: false, myuser, invent, sucur })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/getproductos', async (req, res) => {
    if (req.session.user) {
        res.json(await inventario.allsucursal(req.body))
    } else {
        res.redirect('/login')
    }
})

Routes.post('/getcantidad', async (req, res) => {
    if (req.session.user) {
        res.json(await inventario.getcant(req.body))
    } else {
        res.redirect('/login')
    }
})

Routes.post('/addtrasp', async (req, res) => {
    if (req.session.user) {
        res.json(await traspaso.add(req.body))
    } else {
        res.redirect('/login')
    }
})

Routes.get('/viewtraspaso/:id?', async (req, res) => {
    if (req.session.user) {
        const trasp = await traspaso.one(req.params)
        res.render('pages/congregacional/viewtraspaso', { layout: false, trasp })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/deltraspaso', async (req, res) => {
    if (req.session.user) {
        const dsuc = await traspaso.del(req.body)
        res.json(dsuc)
    } else {
        res.redirect('/login')
    }
})

module.exports = Routes