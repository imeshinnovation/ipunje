const Routes = require('express').Router()
const users = require('../controllers/users')
const codes = require('../controllers/codes')
const { EnviarCorreo } = require('../libs/helpers')

Routes.get('/', async (req, res) => {
    if(req.user){
        const user = await users.allusers()
	    res.render('index', { user })
    } else {
        res.redirect('/login')
    }
})

Routes.get('/login', async (req, res) => {
    const user = await users.allusers()
	res.render('pages/login', { user })
})

Routes.post('/login', async (req, res) => {
    const { email, password, a2f } = req.body
    const verify = await codes.verify(email, a2f)
    if(verify == true){
        
        res.json({'msg': 0})    
    } else {
        res.json({'msg': 1})
    }
    
})

Routes.post('/sendcode', async (req, res) => {
    const { mail } = req.body
    const prev = await users.verifymail(mail)
    if(prev !== null){
        const code = Math.floor(Math.random() * 1000000) +1
        await codes.add(mail, code)
        await EnviarCorreo(mail, 'Código de Verificación', 'Código de Verificación: ' + code)
        res.json({'msg': 'Enviado'})
    } else {
        res.json({'msg': 'Denied'})
    }
})


module.exports = Routes