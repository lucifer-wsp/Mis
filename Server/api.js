const express = require('express');
const app = express();
const user = require('./user')

app.post('/serarch', function(req, res){
	var pid = req.body['pid'];
	console.log(pid);
	user.get_user_info(pid, function(err,result){

	});
});


app.listen(3000);

