var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var user = require('./user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.post('/search', function(req, res){
    var pid = req.param('pid');
    console.log(pid);
    user.get_user_info(pid)
        .then(data => {
            //var result = JSON.stringify(data);
            res.json({result: data});
        });
});



app.listen(3000);

app.all('*', function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
});