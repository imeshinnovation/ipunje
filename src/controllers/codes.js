const { codes } = require('../libs/loadmodels');
const helpers = require('../libs/helpers')

module.exports = {
    add: async (mail, code) => {
        const coder = new codes()
        coder.email = mail
        coder.code = code
        coder.date_record = helpers.daterecord()
        coder.save()
        return coder
    },
    verify: async (email, code) => {
        const codere = await codes.find({ email: email, date_record: { $regex: helpers.onlydate() } }).sort('-date_record').limit(1)
        if(codere[0].code == code){
            return true
        } else {
            return false
        }
    },
    remove: async (email) => {
        await codes.find({ email: email }).deleteMany()
    }
}