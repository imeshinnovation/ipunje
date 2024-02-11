const { diezmos } = require('../libs/loadmodels');


module.exports = {
    dcode: async () => {
        const { dnumber } = require('../libs/helpers')
        let registro
        const lastreg = await diezmos.findOne({}).sort({code: -1 }).lean()
        if(lastreg.code) {
            console.log(lastreg.code);
            const proce = parseInt(String(lastreg.code).slice(1))
            registro = dnumber('D', (proce + 1))
        } else {
            registro = dnumber('D', (await diezmos.find({}).count() + 1))
        }
        return registro
    },
    add: async (body) => {
        const code = await module.exports.dcode()
        body.code = code
        const coder = await diezmos.create(body)
        return coder
    },
    count: async () => {
        return await diezmos.find({}).count()
    },
    all: async () => {
        return await diezmos.find({}).lean()
    },
    alld: async (id) => {
        return await diezmos.find({ id_pastor: id }).lean()
    },
    one: async (id) => {
        return await diezmos.find({ _id: id }).lean()
    },
    del: async (id) => {
        try {
            await diezmos.findOneAndDelete({ _id: id })
            return 'OK'
        } catch {
            return 'NO'
        }
    },
    static: async () => {
        const feca = new Date()
        
    }
}