const container = require('../injector/container')
const db = require('../db/db')
const collection = 'images'

module.exports = class ImageService {
    constructor() {
        this._db = new db(collection)
    }

    async insertImage(user) {
        let toInsert = { user }

        return await new Promise(async(response) => {
            let res = await this._db.insert(toInsert)
            response(res)
        })
    }
}