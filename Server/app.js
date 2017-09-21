var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var user = require('./user');
var log4js = require('log4js');
var log4js_json = require('./log4js.json');


log4js.configure(log4js_json);
var app_log = log4js.getLogger('app');
app.use(log4js.connectLogger(app_log, {level: log4js.levels.INFO}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.all('*', function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	next();
});
app.post('/search', function(req, res){
    var pid = req.param('pid');
    console.log('search interface and receive pid : %s.', pid);
    user.get_user_info(pid)
        .then(data => {
            //var result = JSON.stringify(data);
            res.json({result: data});
        });
});
app.listen(3000);

console.log('listening  3000 port...');
