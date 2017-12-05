var express = require('express');
var app = express();
var http = require('http').Server(app);

//The server object is passed to socket.io
var io = require('socket.io')(http);


//Set the proper root directory for sendfile
// var options = {
//     root: __dirname + '/../',
//     dotfiles: 'deny',
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//     }
// }

//Express part
app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    
})

//Socket.io part
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    console.log('a user connected: ' + (new Date()).getTime());
})

io.on('disconnection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    })
})

http.listen(3000, function(){
    console.log('listening on port 3000');
})