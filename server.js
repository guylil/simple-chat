/**
 * Module dependencies.
 */
var express = require('express');
var app = express();
var debug = require('debug')('express:server');
var http = require('http');

/**
 * Create HTTP server.
 */
var server = http.createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
    res.sendFile(__dirname +'/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected: ', socket.id);
    socket.on('disconnect', function(){
        console.log('user disconnected ',socket.id);
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
});
server.listen(3000, function(){
    console.log('listening on *:3000');
});
