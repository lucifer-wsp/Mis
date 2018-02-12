var promise = require('promise');
var config = require('./config/wechat_config');
var https = require('https');

exports.wechat_auth = function(req){
    return req.query.echostr;
};

exports.wechat_reply = function(req){
    let data = req.body.xml;
    var resMsg = "";
    if (true) {
        let content = "大爷，来玩儿呀～";
        let msgType = "text";
        resMsg = "<xml><ToUserName><![CDATA[" + data.fromusername + 
                    "]]></ToUserName><FromUserName><![CDATA[" + data.tousername + 
                    "]]></FromUserName><CreateTime>" + parseInt(new Date().valueOf() / 1000) + 
                    "</CreateTime><MsgType><![CDATA[" + msgType + "]]></MsgType><Content><![CDATA[" + 
                    content + "]]></Content></xml>";
    }
    return resMsg;
};

exports.wechat_get_Qr = function(){
    return wechat_get_accessToken()
        .then(function(access_token){
            return access_token;
        }, function(error){
            return {"error": err};
        }).then(function(access_token){
            return createQr(access_token)
                    .then(function(data){
                        return JSON.parse(data);
                    }).catch(err => {
                        return {'error': err};
                    });
        }, function(err){
            return {"error": err};
        });
};

function wechat_get_accessToken (){
    return new Promise(function(resolve, reject){
        let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + 
                config.appconfig.appid + '&secret=' + config.appconfig.app_secrect;
        console.log(url);
        https.get(url, function(res){
            console.log(res.statusCode);
            res.on('data', (d) => {
                var access_token = "" + d;
                return resolve(JSON.parse(access_token).access_token);
            });
        });
    }).then((data) => {
        return Promise.resolve(data);
    }).catch((err) => {
        return Promise.reject(err);
    });
};

function createQr(access_token){
    return new Promise(function(resolve, reject){
        let post_data = JSON.stringify({"action_name" : "QR_SCENE", "expire_seconds": 7200});
        let options = {
            host: "api.weixin.qq.com",
            port: 443,
            path: "/cgi-bin/qrcode/create?access_token=" + access_token,
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Content-Length": post_data.length
            }
        };
        cosole.log(options);
        var qr_req = https.request(options, function(res){
            console.log(res.statusCode);
            res.on('data', function(chunk){
                var data = "" + chunk;
                console.log(data);
                qr_info = JSON.stringify(data);
                return resolve(qr_info);
            });
        });
        qr_req.write(post_data);
        qr_req.end();
    }).then((data) => {
        return Promise.resolve(data);
    }).catch((error) => {
        return Promise.reject(error);
    });
};


