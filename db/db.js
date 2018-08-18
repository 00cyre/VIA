const container = require('../injector/container')
const dbConnector = container.getInstanceOf(require('./conn'))
const dbService = require('../services/dbService')

module.exports = class DB {
    constructor(collection) {
        this._collection = collection
        this.init()
    }

    async init() {
        this._db = await dbConnector.getConnection()

        if (!dbService.checkIfCollectionExists(this._db, this._collection))
            this.createCollection()
    }

    async createCollection() {
        await this._db.createCollection(this._collection, (err, res) => {
            if (err) throw err
            console.log(`Collection ${this._collection} created successfully.`)
        })
    }

    async deleteCollection() {
        await this._db.collection(this._collection).drop(function(err, res) {
            if (err) throw err
            if (res) console.log(`Collection ${this._collectio} successfully deleted`)
        })
    }

    async insert(toInsert) {
        return await new Promise(async(response) => {
            await this._db.collection(this._collection).insertOne(toInsert, (err, res) => {
                if (err) throw err
                console.log(`Inserted ${JSON.stringify(toInsert)} into ${this._collection}`)
                response(res)
            })
        })
    }

    async delete(toDelete) {
        await this._db.collection(this._collection).deleteOne(toDelete, function(err, res) {
            if (err) throw err
            console.log(`Deleted ${toDelete} from ${this._collection}`)
        })
    }

    async update(toUpdate, newValues) {
        await this._db.collection(this._collection).updateOne(toUpdate, newValues, function(err, res) {
            if (err) throw err
            console.log(`Updated ${toUpdate} to ${newValues} into ${this._collection}`)
        })
    }

    getManager() {
        return this._db.collection(this._collection)
    }
}