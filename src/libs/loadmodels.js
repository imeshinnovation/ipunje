const rolls = require('../models/roles');
const white = require('../models/whitelist');
const users = require('../models/users');
const codes = require('../models/codes');
const sucursal = require('../models/sucursal');
const admins = require('../models/admins');
const licencias = require('../models/licencias');
const family = require('../models/family');
const oficial = require('../models/oficial');
const ccontables = require('../models/ccontables');
const pcontables = require('../models/pcontables');
const diezmos = require('../models/diezmos');
const friends = require('../models/friends');
const compromises = require('../models/compromise');

module.exports = { 
    white, 
    users, 
    codes, 
    sucursal, 
    rolls, 
    admins, 
    licencias, 
    family, 
    oficial, 
    ccontables, 
    pcontables, 
    diezmos, 
    friends, 
    compromises
};