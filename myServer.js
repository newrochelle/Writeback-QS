var express        =         require("express");
//var bodyParser     =         require("body-parser");
var url 		   = 		 require("url");
var app            =         express();

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.set("jsonp callback", true);
app.enable("jsonp callback");

app.use(function (req, res, next) {
  var query = url.parse(req.url).query
  var obj

  // url = http://localhost:3000/endpoint?jsonp=callback&{%22firstName%22:%20%22dvv%22,%22lastName%22:%20%22vcvccv%22}&_=1472049305033

  if (query) {
	var q =  query.split('&');
    obj = JSON.parse(decodeURIComponent(q[1])) // da errore perchè vorrebbe solo url = http://localhost:3000/endpoint?{%22firstName%22:%20%22andrea%22,%22lastName%22:%20%22gigliotti%22}
	console.log("prima di send!");
	console.log(obj.firstName);
	console.log(obj.lastName);
	console.log(obj);
	console.log(JSON.stringify(obj));
    res.jsonp(obj);
	console.log("dopo di send!");
    return
  }

  var error = new Error('missing query')
  error.status = 400
  next(error)
  //res.jsonp({ "my": "object" });
  
})
  /*
app.get('/endpoint', function(req, res){
	var fn = req.query.firstName;
	console.log('fn: ' + fn);
	res.send('fn: ' + fn);
});*/

app.listen(3000,function(){
  console.log("node express app started at http://localhost:3000");
})

/*
var pg = require('pg');
var connectionString = 'postgres://postgres:Pr0v1nc1a@localhost:4432/postgres';

pg.connect(connectionString, function(err, client, done) {
	
	client.query('SELECT * FROM budget', function(err, result) {
		done();
		if(err) return console.error(err);
		console.log(result.rows);
	});

}); */