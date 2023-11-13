const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();
const env = process.env;

const signtool = {
    encode: (v1) => {
        return new Promise(function(resolve, reject){
            jwt.sign({v1}, env.TKEY, { expiresIn: '60s' }, (err, token) => {
                resolve(token);
            })
        })
    },
    decode: (v1) => {
        return new Promise(function(resolve, reject) {
            jwt.verify(v1, env.TKEY, (err, authData) => {
                resolve(authData);
            })
        })
    },
    verifyToken: (req, res, next) => {
        const bHeader = req.headers['authorization'];
        if(typeof bHeader !== 'undefined'){
            const bToken = bHeader.split(" ")[1];
            req.token = bToken;
            module.exports.decode(bToken).then((result) => {
                if(typeof result !== 'undefined'){
                    next();
                } else {
                    res.sendStatus(403);		
                }
            });
        } else {
            res.sendStatus(403);
        }
    },
    encryptPassword: (v1) => {
        return bcrypt.hashSync(v1, bcrypt.genSaltSync(10));
    },
    comparePassword: function (v1, v2) {
        return bcrypt.compareSync(v1, v2);
    }
}

module.exports = signtool;