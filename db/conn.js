const mongodb = require('mongodb').MongoClient
const url = 'mongodb://localhost/via'

module.exports = class Connection {
    async getConnection() {
        if (!this._db) await this.createConnection()
        return this._db
    }

    async createConnection() {
        return new Promise(async(connected) => {
            await mongodb.connect(url, async(err, db) => {
                if (err) throw err
                this._db = db.db('via')
                console.log('Database connecting...')
                connected()
            })
        })
    }
}