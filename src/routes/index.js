const Routes = require('express').Router()
const users = require('../controllers/users')
const admins = require('../controllers/admins')
const codes = require('../controllers/codes')
const { EnviarCorreo } = require('../libs/helpers')
const { createHmac } = require('node:crypto')

const env = process.env
const secret = env.TKEY

Routes.get('/', async (req, res) => {
    if(req.session.user){
        const user = await users.allusers()
        const myuser = JSON.parse(JSON.stringify(await admins.one(req.session.user)))
        const member = await users.count()
	    res.render('index', { user, myuser, member })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/login', async (req, res) => {
    const user = await admins.all()
    console.log(req.session)
	res.render('pages/login', { user })
})

Routes.post('/login', async (req, res) => {
    const { email, password, a2f } = req.body
    console.log(req.body)
    const verify = await codes.verify(email, a2f)
    if(verify == true){
        const prepass = createHmac('sha256', secret)
        .update(password)
        .digest('hex')
        console.log('Clave Digitada: ',prepass)
        const user = await admins.byemail(email)
        if(prepass.trim() == user.password.trim()){
            req.session.regenerate(async function (err) {
                if (err) next(err)
                req.session.user = user._id
                req.session.save()
                await codes.remove(email)
                res.json({'msg': 1})
            })
        } else {
            res.json({'msg': 0})
        }
    } else {
        res.json({'msg': 0})
    }
    
})

Routes.post('/sendcode', async (req, res) => {
    const { mail } = req.body
    const prev = await admins.verifymail(mail)
    if(prev !== null){
        const code = Math.floor(Math.random() * 1000000) +1
        await codes.add(mail, code)
        await EnviarCorreo(mail, 'Código de Verificación', 'Para poder ingresar al Sistema IPUNSOFT es necesario ingresar el Código OTP (One Time Password): ' +  code )
        res.json({'msg': 'Enviado'})
    } else {
        res.json({'msg': 'Denied'})
    }
})


module.exports = Routes