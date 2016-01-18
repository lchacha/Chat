var express = require('express');
var app = require('express')();
var url = require('url');
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('NodeCode'));

//create a database
var file = "chat.db";
var fs = require("fs");
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

function mesObj(name,message,timeT){
		this.nickname = name;
		this.mes = message;
		this.timeTime=timeT;
		}

db.serialize(function(){
	if(!exists)
		db.run("create table chats(user TEXT NOT NULL,time TEXT NOT NULL,message TEXT);");
});

//
	





io.on('connection',function(socket){
		
		socket.broadcast.emit('connMsg','Has joined the conversation');
		db.each("SELECT user as user,time AS time , message AS mes FROM chats;",function(err,row)
			{
				var msg = new mesObj(row.user, row.mes,row.time);
				socket.emit('chat message',msg);
			});
	
		socket.on('chat message',function(msg){
			console.log('message:' + msg);
			db.run("INSERT INTO chats VALUES(?,?,?)",msg.nickname,msg.timeTime,msg.mes);
			socket.broadcast.emit('chat message',msg)
		});
		socket.on('disconnect',function()
		{
			io.emit('disconnect','User disconnected');
		});
		
});

//send data to the server
app.post('/feed_post', function (req, res){
    res.send('Hello world');
 })
 
var server = http.listen(8089, function(){
	var host = server.address().address
	var port = server.address().port
	
	console.log("Example server loaded...")
})