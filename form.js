var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var db;



app.use(bodyParser());

/*app.use('/static', express.static(__dirname + '/homework'));*/

app.get('/', function(req, resp) {
	resp.sendFile('poll.html', {root: path.join(__dirname)});
	
});


app.post('/form', function(req, resp) {
	resp.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
	var rekform = req.body;
	db.collection('form').insert(rekform, function (err, result) {
		if(err){
			console.log(err);
			resp.sendStatus(500);
		}
		/*resp.send(rekform);*/
	})
	
	
	
	resp.end(JSON.stringify(req.body));
	
	
	
	
	
	
});



MongoClient.connect('mongodb://localhost:27017/poll', function(err, database){
	if(err) {
		return console.log(err);
	}
	db = database;
	app.listen(1337, function() {
	console.log('Слушаю порт 1337');
});
})

