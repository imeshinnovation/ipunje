const Routes = require('express').Router()
const users = require('../controllers/users')
const familys = require('../controllers/family')
const admins = require('../controllers/admins')
const sucursales = require('../controllers/sucursal')
const codes = require('../controllers/codes')
const { EnviarCorreo } = require('../libs/helpers')
const { createHmac } = require('node:crypto')

const env = process.env
const secret = env.TKEY

Routes.get('/', async (req, res) => {
    if (req.session.user) {
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        const member = await users.count()
        const famil = await familys.count()
        res.render('index', { user, myuser, member, famil })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/login', async (req, res) => {
    const user = await admins.all()
    res.render('pages/login', { user })
})

Routes.get('/logout', async (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

Routes.post('/login', async (req, res) => {
    const { email, password, a2f } = req.body
    const verify = await codes.verify(email, a2f)
    if (verify == true) {
        const prepass = createHmac('sha256', secret)
            .update(password)
            .digest('hex')
        const user = await admins.byemail(email)
        const sucursal = await sucursales.mysucursal(user.names + ' ' + user.lastnames)
        if (prepass.trim() == user.password.trim()) {
            req.session.regenerate(async function (err) {
                if (err) next(err)
                try {
                req.session.user = user._id
                req.session.name = user.names + ' ' + user.lastnames
                req.session.roll = user.roll
                req.session.sucursal = sucursal.nombre_sucursal
                req.session.save()
                } catch {
                    console.log('')
                }
                await codes.remove(email)
                res.json({ 'msg': 1 })
            })
        } else {
            res.json({ 'msg': 0 })
        }
    } else {
        res.json({ 'msg': 0 })
    }

})

Routes.post('/sendcode', async (req, res) => {
    const { mail } = req.body
    const prev = await admins.verifymail(mail)
    if (prev !== null) {
        const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
        await codes.add(mail, code)
        await EnviarCorreo(mail, 'Código de Verificación', 'Para poder ingresar al Sistema IPUNSOFT es necesario ingresar el Código OTP (One Time Password): ' + code)
        res.json({ 'msg': 'Enviado' })
    } else {
        res.json({ 'msg': 'Denied' })
    }
})


module.exports = Routes