var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const session = require('express-session')
const http = require('http').Server(app);
const ios = require('socket.io').listen(http);
const container = require('./injector/container');
const sockets = container.getInstanceOf(require('./via/socket'));
const index = require('./via/index')
app.use(session({secret: "3",resave:false,saveUninitialized:true}))
var fs = require("fs");

http.listen(3000,'localhost')

app.post('/cadastro', urlencodedParser, function (req, res) {
    index.regusr(req.body)
    res.sendFile(__dirname + '/index.html')
})
app.post('/login', urlencodedParser, function (req, res) {
    
    let sql = index.loginusr(req.body);
    console.log(req.body);
    sql.then(function(e) {
        console.log(e);
        req.session.user = e[0];
        if (e[0].susr == 2)
        {
          res.sendFile(__dirname + '/dashboard/adindex.html'/* ,{ root: __dirname + './dashboard/index.html' } */)
          //connecting everytime you reload on /login
          socket = sockets.connect(http,{usrid : e[0].usrid,susr: e[0].susr,  user: e[0].usr,email: e[0].email,pass: e[0].psw})
        }
        else
        {
          
        res.sendFile(__dirname + '/dashboard/index.html'/* ,{ root: __dirname + './dashboard/index.html' } */)
        //connecting everytime you reload on /login
        socket = sockets.connect(http,{usrid : e[0].usrid, user: e[0].usr,email: e[0].email,pass: e[0].psw})
        }
      }).catch(function(e){
        console.log("error: " + e);
    })
    
})
app.get(/^(.+)$/, function(req, res){ 
    res.sendFile( __dirname + req.params[0]); 
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
}) 

app.get('/dashboard', function(req, res) {
    console.log(req.session.user)
    if (!req.session.user){

        res.sendFile(__dirname + '/index.html')
    }
    
    res.status(200).sendFile(__dirname + '/dashboard/index.html')
}) 










/* 
function main() {
  fs.readdir("./node_modules", function (err, dirs) {
    if (err) {
      console.log(err);
      return;
    }
    dirs.forEach(function(dir){
      if (dir.indexOf(".") !== 0) {
        var packageJsonFile = "./node_modules/" + dir + "/package.json";
        if (fs.existsSync(packageJsonFile)) {
          fs.readFile(packageJsonFile, function (err, data) {
            if (err) {
              console.log(err);
            }
            else {
              var json = JSON.parse(data);
              console.log('"'+json.name+'": "' + json.version + '",');
            }
          });
        }
      }
    });

  });
}

main(); */
