const mysql = require('mysql')

    var x = {
        host: "localhost",
        user: "root",
        password: "",
        database: "via"
    }
    var con = mysql.createPool(x)
    module.exports = class DB {
    constructor(collection) {
    }




    async insertimg(image,text,user) 
    {      
        return await new Promise(async(resolve,reject) => {
            con.query("INSERT INTO `pic`(`idpic`, `image`, `text`, `usridpic`) VALUES (NULL,?,?,?)",[image,text,user], function (err, result, fields) {
                if (err){
                    reject(err)
                    /* con.release(); */
                }
                    resolve(result)
                    /* con.release(); */
            })
            /* con.release(); */
        })
    }
    async insertuser(user,pass,email) 
    {      
        return await new Promise(async(resolve,reject)=> {
            con.query("INSERT INTO `usr` (`usrid`,`susr`, `usr`, `email`, `psw`) VALUES (NULL,1,?,?,?)",[user,email,pass], function (err, result, fields) {
                if (err){
                    reject(err)
                    /* con.release(); */
                }
                    resolve(result)
                    /* con.release(); */
            })
        })
    }
    async selectimg(uid) {
        return await new Promise(async(resolve,reject) => {
            con.query("SELECT * FROM `pic` WHERE usridpic = ?",[uid], function (err, result, fields) {
                if (err){
                    reject(err)
                    /* con.release(); */
                }else{
                    if(result.length > 0){
                    resolve(result)
                    /* con.release(); */}}
                })
        })
    }
    async selecttext(id) {
        return await new Promise(async(resolve,reject) => {
            con.query("SELECT * FROM `pic` WHERE idpic = ?",[id], function (err, result, fields) {
                if (err){
                    reject(err)
                    /* con.release(); */
                }else{
                    if(result.length > 0){
                    resolve(result)
                    /* con.release(); */}}
                })
        })
    }
    async loginuser(user,pass) {
        return await new Promise(async(resolve,reject) => {
            con.query("SELECT * FROM `usr` WHERE email = ? AND psw = ?",[user,pass], function (err, result, fields) {
                if (err){
                    reject(err)
                    /* con.release(); */
                }else{
                    if(result.length > 0){
                    resolve(result)
                    /* con.release(); */}}
                })
        })
    }

    
}