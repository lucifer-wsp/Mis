var bodyParser = require('body-parser');
var user = require('./user');
var app = require('./app');

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


