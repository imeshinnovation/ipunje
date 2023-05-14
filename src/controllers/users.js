const { users } = require('../libs/loadmodels');

module.exports = {
    allusers: async () => {
        const alluser = await users.find({}).lean()
        return alluser
    },
    oneuser: async (id) => {
        const oneus = await users.findOne({_id: id})
        return oneus
    },
    verifymail: async (mail) => {
        const yer = await users.findOne({email: mail})
        return yer
    }
}