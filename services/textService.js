const container = require('../injector/container')
const db = require('../db/db')
const speech = require('../via/speech.js')
const collection = 'images'

module.exports = class textService {
    constructor() {

        this._db = new db()
    }

    async selectText(id) {

        return await new Promise(async(resolve,reject) => {
            
            this._db.selecttext(id).then(function(e){
                speech.TexttoSpeech(e[0].text).then(function(e){
                    resolve(e);
                }).catch(function(e){
                    reject(e)
                })
            }).catch(function(e){
                reject(e)
            })
    })
    }

}