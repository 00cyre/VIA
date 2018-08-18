const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const container = require('./injector/container')
const sockets = container.getInstanceOf(require('./via/socket'))

http.listen(3000, function() {
    console.log('Listening on *:3000')
    sockets.connect(io)
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})