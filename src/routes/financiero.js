const Routes = require('express').Router()
const admins = require('../controllers/admins')
const sucursal = require('../controllers/sucursal')
const ccontables = require('../controllers/ccontables')
const pcontables = require('../controllers/pcontables')
const diezmos = require('../controllers/diezmos')
const { EnviarCorreo, Schedule, dnumber, daterecord } = require('../libs/helpers')

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

Routes.post('/getprod', async (req, res) => {
    if (req.session.user) {
        res.json(await pcontables.one(req.body.id))
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
        const user = await admins.one(req.session.user)
        let alld
        if(req.session.roll == 1){
            alld = await diezmos.all()
        } else {
            alld = await diezmos.alld(req.session.user)
        }
        res.render('pages/financiero/regdiezmos', { layout: false, user, alld })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/adddiezmo', async (req, res) => {
    if (req.session.user) {
        const user = await admins.one(req.session.user)
        const cuentas = await ccontables.all()
        const cactivos = await pcontables.cactivos()
        res.render('pages/financiero/adddiezmo', { layout: false, user, cuentas, cactivos })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/viewdiezmo/:id?', async (req, res) => {
    if (req.session.user) {
        const alldata = await diezmos.one(req.params.id)
        res.render('pages/financiero/viewdiezmo', {layout: false, alldata})
    } else {
        res.redirect('/login')
    }
})

Routes.post('/deldiezmo', async (req, res) => {
    if(req.session.user){
        res.json({'msg': await diezmos.del(req.body.id)})
    } else {
        res.redirect('/login')
    }
})

Routes.post('/adddiezmo', async (req, res) => {
    if (req.session.user) {
        const userl = await admins.one(req.session.user)
        let body = req.body
        body.id_pastor = req.session.user
        body.nombre_pastor = req.session.name
        body.date_record = daterecord()
        await diezmos.add(body)
        res.redirect("/financiero/diezmos")
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

Routes.get('/addaporte', async (req, res) => {
    if (req.session.user) {
        const user = await admins.one(req.session.user)
        const cuentas = await ccontables.all()
        const cactivos = await pcontables.cactivos()
        res.render('pages/financiero/addaporte', { layout: false, user, cuentas, cactivos })
    } else {
        res.redirect('/login')
    }
})


module.exports = Routes;