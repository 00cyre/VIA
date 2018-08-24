const container = require('../injector/container')
const db = require('../db/db')
const collection = 'images'
module.exports = class UserService {
    constructor() {
        this._db = new db(collection)
    }

    async login(email,pass) {
        return await new Promise(async(resolve,reject) => {
            this._db.loginuser(email,pass).catch(function(e){
                reject(e)
            }).then(function(e){
                resolve(e)
            })
        })
    }
    async register(user,pass,email) {
        return await new Promise(async(resolve,reject) => {
            this._db.insertuser(user,pass,email).then(function(e){
                resolve(true)
            }).catch(function(e){
                reject(e);
            })
        })
    }
}