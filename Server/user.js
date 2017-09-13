var mysql = require('mysql');
var promise = require('promise');

exports.get_user_info = function (pid){
    return new Promise(function (resolve, reject){
        var mysql_conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'reload123',
            port:'3306',
            database:'Splmm'
        });
        var sel_sql = 'select pid,detail_info,from_unixtime(timestamp) as timestamp from mis_info where pid = ' + pid + ';';

        mysql_conn.connect();
        mysql_conn.query(sel_sql, function(err, result){
            if(err){
                console.log('query err ' + err);
                //return Promise.reject(err);
            }
            console.log('1111: %s.', result);
            return resolve(result);
        });
        mysql_conn.end();
    }).then((data) => {
        console.log('2222: %s.', data);
        return Promise.resolve(data);
    }).catch((err) => {
        return Promise.reject(err)
    });
};