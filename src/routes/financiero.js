const Routes = require('express').Router()
const admins = require('../controllers/admins')
const sucursal = require('../controllers/sucursal')
const ccontables = require('../controllers/ccontables')
const pcontables = require('../controllers/pcontables')
const { EnviarCorreo, Schedule } = require('../libs/helpers')

//Schedule(0, 12, 10, null, null, null, 'imesh@ipunje.cl', 'Envio de Aportes Parafiscales para el 30 de este Mes, Es urgente y Prioritario')

Routes.get('/ccontables', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.render('pages/financiero/ccontables', { user, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/cdash', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const cactivos = await ccontables.cactivos()
        const cpasivos = await ccontables.cpasivos()
        const pcount = await pcontables.count()
        res.render('pages/financiero/cdash', { layout: false, user, cactivos, cpasivos, pcount })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/cuentas', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const cuentas = await ccontables.all()
        res.render('pages/financiero/cuentas', { layout: false, user, cuentas })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/prodfin', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const cuentas = await pcontables.all()
        res.render('pages/financiero/prodfin', { layout: false, user, cuentas })
    } else {
        res.redirect('/login')
    }
})


Routes.get('/addcuenta', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const cuentas = await ccontables.all()
        res.render('pages/financiero/addcuenta', { layout: false, user, cuentas })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/addpcuenta/:id?', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const cactivos = await ccontables.activos()
        const cpasivos = await ccontables.pasivos()
        const cuentas = await pcontables.one(req.params.id)
        res.render('pages/financiero/addpcuenta', { layout: false, user, cactivos, cpasivos, 'id': req.params.id, cuentas })
    } else {
        res.redirect('/login')
    }
})

Routes.post('/addcuenta', async (req, res) => {
    const contable = await ccontables.add(req.body)
    res.json(contable)
})

Routes.post('/addpcuenta', async (req, res) => {
    const pcontable = await pcontables.add(req.body)
    res.json(pcontable)
})

Routes.post('/delcuenta', async (req, res) => {
    const contable = await ccontables.del(req.body)
    res.json(contable)
})

Routes.post('/delprod', async (req, res) => {
    const pcontable = await pcontables.del(req.body)
    res.json(pcontable)
})

Routes.get('/tipos', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const tipos = await ccontables.all()
        res.render('pages/financiero/tipos', { layout: false, user, tipos })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/productos', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.render('pages/financiero/productos', { user, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/rproductos', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const cuentas = await ccontables.all()
        res.render('pages/financiero/rproductos', { layout: false, user, cuentas })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/inventario', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const cuentas = await ccontables.all()
        const sucursales = await sucursal.allsucursales()
        res.render('pages/financiero/inventario', { layout: false, user, cuentas, sucursales })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/ddash', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const cuentas = await ccontables.all()
        res.render('pages/financiero/ddash', { layout: false, user, cuentas })
    } else {
        res.redirect('/login')
    }
})


Routes.get('/diezmos', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        res.render('pages/financiero/diezmos', { user, myuser })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/regdiezmos', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const cuentas = await ccontables.all()
        const sucursales = await sucursal.allsucursales()
        res.render('pages/financiero/regdiezmos', { layout: false, user, cuentas, sucursales })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/adddiezmo', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const cuentas = await ccontables.all()
        res.render('pages/financiero/adddiezmo', { layout: false, user, cuentas })
    } else {
        res.redirect('/login')
    }
})


Routes.get('/regaportes', async (req, res) => {
    if (req.session.user) {
        const user = await admins.all()
        const cuentas = await ccontables.all()
        const sucursales = await sucursal.allsucursales()
        res.render('pages/financiero/regaportes', { layout: false, user, cuentas, sucursales })
    } else {
        res.redirect('/login')
    }
})



module.exports = Routes;