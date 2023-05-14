const Routes = require("express").Router()
const secure = require("../libs/secure");
const { users } = require('../libs/loadmodels');

Routes.post('/login', async (req, res) => {
	const datos = { email, password } = req.body
	const user = await users.findOne({ email })
	console.log(secure.encryptPassword(password))
	if (user) {
		if (secure.comparePassword(password, user.password)) {
			secure.encode(user).then((result) => {
				res.json({ result })
			});
		} else {
			res.sendStatus(403);
		}
	} else {
		res.sendStatus(403);
	}
})

Routes.post('/poster', secure.verifyToken, async (req, res) => {
	secure.decode(req.token).then((result) => {
		res.json({result})
	})
})


module.exports = Routes
