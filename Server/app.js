var express = require('express');
var bodyParser = require('body-parser');
var log4js = require('log4js');
var http = require('http');

var user = require('./user');
var wechat = require('./wechat');

require('body-parser-xml')(bodyParser);

log4js.configure({
    appenders: {
        default: { type: 'dateFile', filename: 'logs/access', 
                    pattern: '_yyyy_MM_dd.log', alwaysIncludePattern: true },
        error: { type: 'dateFile', filename: 'logs/error', 
                    pattern: '_yyyy_MM_dd.log', alwaysIncludePattern: true },
        out: {type: 'console'},
    },
    categories: {
        default: { appenders: ['out', 'default'], level: 'info' },
        error: { appenders: ['error'], level: 'error' }
    }
});
const info_logger = log4js.getLogger('out');
const err_logger = log4js.getLogger('error');
console.log = info_logger.info.bind(info_logger);
console.error = err_logger.error.bind(err_logger);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.xml({
  limit: '1MB',   // Reject payload bigger than 1 MB
  xmlParseOptions: {
    normalize: true,     // Trim whitespace inside text nodes
    normalizeTags: true, // Transform tags to lowercase
    explicitArray: false // Only put nodes in array if >1
  }
}));
app.all('*', function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//微信数据格式均为xml
app.get('/wechat', function(req, res){
  console.log('get wechat ...');
  res.send(wechat.wechat_auth(req));
  res.end();
});

app.post('/wechat', function(req, res){
    res.send(wechat.wechat_reply(req));
    res.end();
});

app.get('/createQr', function(req, res){
    wechat.wechat_get_Qr()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.json({'error': err});
        });
});

app.post('/search', function(req, res){
    var pid = req.param('pid');
    console.log('search interface and receive pid : %s.', pid);
    user.get_user_info(pid)
        .then(data => {
            //var result = JSON.stringify(data);
            res.json({result: data});
        }).catch(err => {
            res.json({'error': err});
        });
});
app.listen(3000);

console.log('listening  3000 port...');