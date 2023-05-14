const { licencias } = require('../libs/loadmodels');
const helpers = require('../libs/helpers')

module.exports = {
    all: async () => {
        const all = await licencias.find({}).lean()
        return all
    }
}