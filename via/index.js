const fs = require('fs')
const container = require('../injector/container')
const vision = container.getInstanceOf(require('./vision'))
const imageService = container.getInstanceOf(require('../services/imageService'))
const usrService = container.getInstanceOf(require('../services/UserService'))
const txtService = container.getInstanceOf(require('../services/textService'))
const brailleTranslator = require('../braille/translator')
exports.writeBase64InPNGFile = async(name, base64file) => {
    let saveDir = `./images/${name}.png`
    return await new Promise(async(fileName) => {
        fs.writeFile(saveDir, base64file, 'base64', function(err) {
            if (err) {
                console.log(err)
            } else {
                fileName(saveDir)
            }
        })
    })
}

exports.getBrailleFromBase64Image = async(userid, base64file) => {
    let insertImageResponse = await imageService.insertImage(text)
    let imageId = insertImageResponse.insertedId
    let file = await this.writeBase64InPNGFile(imageId, base64file)
    let text = await vision.getTextFromImage(file)
    let braille = new brailleTranslator(text).getBrailleFromText()
    return braille
}
exports.InsertTextToDb = async(base64file,usrid) => {
    let file = await this.writeBase64InPNGFile("LatestImgSent",base64file)
    return await new Promise(async(resolve,reject) => {
    let text = await vision.getTextFromImage(file)
    imageService.insertImage(base64file,text[0].fullTextAnnotation.text,usrid).then(function(e){
        resolve(e)
    }).catch(function(e){
        reject(e)
    })
    
    }) 
}

exports.GetText = async(id) => {
    return await new Promise(async(resolve,reject) => {
        vision.getTextFromImage(file).then(function(e){
            resolve(e)
        }).catch(function(e){
            reject(e)
         })
    })
}
exports.getImg = async(uid) => {
    return await new Promise(async(resolve,reject) => {
        imageService.selectImage(uid).catch(function(e){
            reject(e)
        }).then(function(e){
            resolve(e)
        })
    })
}
exports.loginusr = async(json) => {
    return await new Promise(async(resolve,reject) => {
        usrService.login(json["Email"],json["Senha"]).catch(function(e){
            reject(e)
        }).then(function(e){
            resolve(e)
        })
    })
}
exports.regusr = async(json) => {
    return await new Promise(async(resolve,reject)=>
    {
        usrService.register(json["nome_usu"],json["Senha"],json["Email"]).then(function(e){
            resolve(e)
        }).catch(function(e){
            reject(e)
        })
    })
}
exports.SelectTextFromDB = async(id) => {
    return await new Promise(async(resolve,reject)=>
    {
        txtService.selectText(id).then(function(e){
            resolve(e)
        }).catch(function(e){
            reject(e)
        })
    })
}