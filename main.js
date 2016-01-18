//console.log("Hello, Chacha Lenah Moragwa")
var http = require("http");
var express  = require("express")
var fs = require("fs");
var url = require("url");
//create the serve
//var data = fs.readFileSync('input.txt');
http.createServer(function(request,response){
	var pathname = url.parse(request.url).pathname;
	response.writeHead(200,{'Content-Type':'text/html'});
	//var data = fs.readFileSync('input.txt');
	fs.readFile(pathname.sub(1),function(err,data){if (err) return console.error(err);
	response.end(data.toString())});
	//response.end("lenah chacha")});
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');
   