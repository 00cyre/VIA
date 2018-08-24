const container = require('../injector/container')
const db = require('../db/db')
const collection = 'images'

module.exports = class ImageService {
    constructor() {
        this._db = new db(collection)
    }

    async insertImage(image,text,user) {
        //let toInsert =  user 
        return await new Promise(async(resolve,reject) => {
            this._db.insertimg(image,text,user).then(function(e){
                resolve(e)
            }).catch(function(e){
                reject(e)
            })
        })
    }
    async selectImage(uid) {
        //let toInsert =  user 
        return await new Promise(async(resolve) => {
            this._db.selectimg(uid).then(function(e){
                resolve(e)
            }).catch(function(e){
                reject(e)
            })
        })
    }
}