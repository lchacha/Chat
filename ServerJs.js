var express = require('express');
var app = require('express')();
var url = require('url');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ejs = require('ejs');
app.use(express.static('NodeCode/JavaScript'));

//create a database
var file = "chat.db";
var fs = require("fs");
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
var name = "";

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
	app.get('/index.html', function (req, res){
	var nickname = req.query.nickname;
	console.log(nickname);
	name = nickname;
	var index = fs.readFileSync('NodeCode/index.html');
	html = ejs.render(index.toString(),{username: nickname});
	//var pathname = url.parse(req.url).pathname;
	//res.sendFile(pathname,{"root":__dirname});
	res.send(html);
	});
	
	app.get('/', function (req, res){
	//var pathname = url.parse(req.url).pathname;
	res.sendFile("login.html",{"root":__dirname});
});





io.on('connection',function(socket){
		
		socket.broadcast.emit('connMsg',name + ' joined');
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
			io.emit('disconnect','User left');
		});
		
});

//send data to the server
app.post('/feed_post', function (req, res){
    res.send('Hello world');
 })
var server = http.listen(8082, function(){
	var host = server.address().address
	var port = server.address().port
	
	console.log("Server is running...")
})