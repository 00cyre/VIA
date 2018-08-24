const vision = require('@google-cloud/vision')
const client = new vision.ImageAnnotatorClient({
    keyFilename: '../googlekey.json'
})

module.exports = class ImageRecognition {
    async getImageRecognitionResponse(fileDir) {
        return await new Promise(async(resolve,reject) => {
            client.documentTextDetection(fileDir).then(function(e){
                    resolve(e)
                }).catch(function(e){
                    reject(e)
                })
        })
    }

    async getTextFromImage(fileDir) {
        return await new Promise(async(resolve,reject) => {
        this.getImageRecognitionResponse(fileDir).then(function(e){
                resolve(e)
            }).catch(function(e){
                reject(e)
            })
        })
    }
}