const mysql = require('mysql');

exports.get_user_info = function (pid,){
	var mysql_conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'reload123',
		port:'3306',
		database:'Splmm'
	});
	var sel_sql = 'select * from mis_info where pid = ' + pid + ';';

	mysql_conn.connect();
	mysql_conn.query(sel_sql, function(err, result){
		if(err){
			console.log('query err ' + err);
			return ;
		}
		return result;
	});
	mysql_conn.end();
};