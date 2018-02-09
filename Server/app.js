var express = require('express');
var bodyParser = require('body-parser');
var user = require('./user');
var log4js = require('log4js');
require('body-parser-xml')(bodyParser);
var app = express();
//var log4js_json = require('./log4js.json');


//log4js.configure(log4js_json);
var app_log = log4js.getLogger();
app.use(log4js.connectLogger(app_log, {level: log4js.levels.INFO}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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
  console.log('wechat...');
  console.log(req.query.echostr);
  res.status(200);
  //res.type("application/xml");
  //let content = "妹子找！";
  //let resMsg = "<xml><ToUserName><![CDATA[" + "oSOixwg5RRK40Vq5DKUKjxP2LX5w" + "]]></ToUserName><FromUserName><![CDATA[" + "gh_2265890e6f31" + "]]></FromUserName><CreateTime>" + parseInt(new Date().valueOf() / 1000) + "</CreateTime><MsgType><![CDATA[" + "text" + "]]></MsgType><Content><![CDATA[" + content + "]]></Content></xml>";
  //let resMsg = "";
  //console.log(resMsg);
  //res.send(resMsg);
  res.send(req.query.echostr)
  res.end();
  //res.json({"echostr": req.query.echostr});
});

app.post('/wechat', function(req, res){
  console.log('post wechat');
  console.log(req.body.xml);
  console.log(req.url);
  let data = req.body.xml;
  let content = "大爷，来玩儿呀～";
  let msgType = "text";
  let resMsg = "<xml><ToUserName><![CDATA[" + data.fromusername + "]]></ToUserName><FromUserName><![CDATA[" + data.tousername + "]]></FromUserName><CreateTime>" + parseInt(new Date().valueOf() / 1000) + "</CreateTime><MsgType><![CDATA[" + msgType + "]]></MsgType><Content><![CDATA[" + content + "]]></Content></xml>";
  res.status(200);
  res.type('application/xml');
  console.log(resMsg);
  res.send(resMsg);
  //console.log(res);
  res.end();
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