const container = require('../injector/container')
const dbManager = container.getInstanceOf(require('../db/conn'))

module.exports = class dbService {
    static checkIfCollectionExists(db, collection) {
        let cols = db.listCollections({ name: collection })
        console.log(`Checking if ${collection} exists...`)
        cols.next((err, collinfo) => {
            if (collinfo) {
                return true
            }
            return false
        })
    }
}