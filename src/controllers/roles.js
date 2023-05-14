const { rolls } = require('../libs/loadmodels');
const helpers = require('../libs/helpers')

module.exports = {
    all: async () => {
        const all = await rolls.find({}).lean()
        return all
    }
}