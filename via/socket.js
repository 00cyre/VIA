const index = require('./index.js')
var socketio = require('socket.io');

module.exports = class SocketConnection {
    async connect(ios,user) {
        var io = socketio.listen(ios)
        io.on('connection', async(socket) => {
            function _arrayBufferToBase64( buffer ) {
                var binary = '';
                var bytes = new Uint8Array( buffer );
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode( bytes[ i ] );
                }
                return  binary;
            }
            function replaceAllBackSlash(targetStr){
                var index=targetStr.indexOf("\n");
                while(index >= 0){
                    targetStr=targetStr.replace('\n',"");
                    index=targetStr.indexOf("\n");
                }
                return targetStr;
            }
            console.log(`A user connected. UserId: ${user.usrid}`)
            index.getImg(user.usrid).then(function(e){
                var x = JSON.stringify(e);
               //console.log("Found images" + x)
               /*  x.forEach(element => {
                    console.log("user" + element)
                }); */
                socket.emit('LoadPage',{usr: user.user,email:user.email,pass:user.pass,img:e})
            }).catch(function(e){
                socket.emit('LoadPage',{usr: user.user,email:user.email,pass:user.pass})
            })
            socket.on('decode',async(file) =>{
                console.log(file)
                index.writeBase64InPNGFile(file.idpic,
                    _arrayBufferToBase64(file.image))
            })
            socket.on('disconnect', () => {
                console.log(`User disconnected. UserId: ${user.usrid}`)
            })
             socket.on('EncodedImg', async(msg) => {
                new Promise(async(resolve,reject) => {
                    index.InsertTextToDb(msg,user.usrid).then(function(e){
                        console.log(`Sending image to user. UserId: ${user.usrid}`)
                    }).catch(function(e){
                        console.log(`Failed to send ${e} to user. UserId: ${user.usrid}`)
                    })
                
                })
            })
            socket.on('speech',async(id)=>{
                new Promise(async(resolve,reject) => {
                    index.SelectTextFromDB(id).then(function(e){
                        resolve(e)
                        socket.emit('speechs', e)
                    }).catch(function(e){
                        console.log("error: " + e)
                        reject(e)
                    })
                })
            })
            socket.on("LoadImage",async(data)=>{
                console.log(data)
            })
            socket.on('login',async(usr,pass)=>{
                if (await index.checkl(usr,pass) != null)
                {
                    socket.emit('logged')
                }
            })
        })
        console.log('Sockets initialized')
    }
}