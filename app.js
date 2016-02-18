
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

// app.get('/', function(req, res) {
//     res.send('testing home route');
// });

app.listen(8080, function() {
    console.log('Express app listening on port 8080');
});


app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

app.post('/movies', function(req, res) {
    console.log(req.body);
	var url = 'http://www.omdbapi.com/?t=' + req.body.moviename;
    request.get(url, function(error, response, body){
    	console.log('test')
    	var parsed = JSON.parse(response.body)
    	res.send(parsed.Director)
    })
});





app.get('/movie/:moviename', function(req, res) {
    var url = 'http://www.omdbapi.com/?t=' + req.params.moviename;
    request.get(url, function(error, response, body) {
        res.send(body);
    });
});

