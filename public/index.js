var
    request = require('request')
,   ServerLink = 'https://stepbystep.fingera.com'
,   ServerUsers = []
,   mysql = require('mysql')
,   e_1f5a5 = 1;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "catering"
});

function GetTimestamp() {
    result = Date.now()
    return (result/1000).toString().split('.')[0];
}

function timeConverter(timestamp, format){
    var a = new Date(timestamp * 1000)
    ,   months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    ,   year = a.getFullYear()
    ,   month = a.getMonth()+1
    ,   monthName = months[a.getMonth()]
    ,   date = a.getDate()
    ,   hour = a.getHours()
    ,   min = a.getMinutes()
    ,   sec = a.getSeconds();
    switch (format) {
        case 'full':
            return date+'.'+month+'.'+year+' '+hour+':'+min+':'+sec;
            break;
        default:
            return  date+'.'+month+'.'+year;
            break;
    }
}

con.connect(function(err) {
    if (err) {
        console.log(err);
        console.log("SQL connection refused")
    } else {
        console.log("SQL connected.");
    }
});

request({
    url: ServerLink+'/api/users',
    method: 'GET',
    headers: {
        'Authorization': 'Basic ' + new Buffer.from('xxxx'+ ':' + 'xxxx').toString('base64')
    },
    json: {}
}, function (error, response, body) {
    for(e_1f50f in body){
        if (body[e_1f50f].pin != null) {
            ServerUsers.push(body[e_1f50f]);
        }
    }
})

function e_1f4be(code) {
    return ServerUsers.filter(
        function(data) {
        return data.pin == code
    });
}

////////////////////////
// SERVER MODUL       //
// VERION 1.0.0 FINAL //
////////////////////////

if (e_1f5a5 != false) {
    var
        server_port = 3000
    ,   express = require('express')
    ,   all_routes = require('express-list-endpoints')
    ,   app = express()
    ,   ip = require("ip")
    ;

    app.use(express.json());
    app.get('/routes', function(req, res) {
        if(req.query.pwd == 'admin') {
            res.json(all_routes(app));
        } else {
            res.json({'status':'wrong password'});
        }
    })

    app.post('/set_user_food', function(req, res) {
        var pin_code = req.headers['pin_code'],
            food_id = req.body.food_id,
            food_type = req.body.food_type,
            date = timeConverter(req.body.date);

        if (pin_code && food_id && food_type && req.body.date) {
            var e_1f464 = e_1f4be(pin_code)[0];
            if (e_1f464) {
                con.query("SELECT name, editable FROM "+food_type+" WHERE date = '"+date+"' AND number = '"+food_id+"'", function (err, body, fields) {
                    if (err) {
                        res.json({
                            status:'wrong parameters',
                            parameters:{
                                body:{
                                    food_id:'food id',
                                    food_type:'main_meal / food_soup',
                                    date:'food serving timestamp'
                                },
                                head:{
                                    pin_code:'user pin code'
                                }
                            }
                        })
                    } else if(body[0]) {
                        if (GetTimestamp() > body[0].editable) {
                            res.json({
                                status:'uneditable',
                                current:{
                                    timestamp:GetTimestamp(),
                                    date_time:timeConverter(GetTimestamp(), 'full')
                                },
                                food_name:body[0].name,
                                food_date:date,
                                editable:{
                                    timestamp:body[0].editable,
                                    date_time:timeConverter(body[0].editable, 'full')
                                }
                            })
                        } else {
                            con.query("SELECT food_id, date FROM users WHERE date = '"+date+"' AND user_id = '"+e_1f464.id+"' AND food_type = '"+food_type+"'", function (err, body, fields) {
                                if (err) {
                                    console.log(err);
                                } else if(body[0]) {
                                    con.query("UPDATE users SET food_id = '"+food_id+"' WHERE user_id = '"+e_1f464.id+"' AND food_type = '"+food_type+"' AND date = '"+date+"'", function (err, body, fields) {
                                        if (err) throw err;
                                        res.json({
                                            status:'updated',
                                            message:'user update existing food'
                                        })
                                    });
                                } else {
                                    con.query("INSERT INTO users (user_id, food_type, food_id, date) VALUES ('"+e_1f464.id+"', '"+food_type+"', '"+food_id+"', '"+date+"')", function (err, body, fields) {
                                        if (err) throw err;
                                        res.json({
                                            status:'created',
                                            message:'user has not selected any food'
                                        })
                                    });
                                }
                            })
                        }
                    } else {
                        con.query("SELECT name FROM "+food_type+" WHERE date = '"+date+"'", function (err, body, fields) {
                            if(err) {
                                res.json({
                                    status:'unknown date',
                                    message:'day '+date+' has no meals'
                                })
                            } else if(body[0]) {
                                res.json({
                                    status:'unknown food_id',
                                    message:'day '+date+' has only '+ body.length +' meals'
                                })
                            } else {
                                res.json({
                                    status:'unknown date',
                                    message:'day '+date+' has no meals'
                                })
                            }
                        })
                    }
                })
            } else {
                res.json({
                    'status':'wrong credentials'
                })
            }
        } else {
            res.json({
                status:'missing parameters',
                missing_parameters:{
                    body:{
                        food_id:!food_id,
                        food_type:!food_type,
                        date:!req.body.date
                    },
                    head:{
                        pin_code:!pin_code
                    }
                }
            })
        }
    });

    app.post('/set_daily_food', function(req, res) {
        var e_1f354 = req.body.food_type, // food_main && food_soap
            e_1f953 = req.body.food_name, // food name
            e_1f4c6 = timeConverter(req.body.food_date), // food serving timestamp
            e_1f4c6e_1f510 = req.body.food_editabled_date, // food editabled timestamp
            e_1f522 = 'x';

        if (e_1f354 && e_1f953 && req.body.food_date && req.body.food_editabled_date) {
            con.query("SELECT number FROM "+e_1f354+" WHERE date = '"+e_1f4c6+"' ORDER BY id DESC LIMIT 1", function (err, body, fields) {
                if (err) {
                    res.json({
                        status:'wrong parameters',
                        parameters:{
                            body:{
                                food_type:'main_meal / food_soup',
                                food_name:'food name',
                                food_date:'food serving timestamp',
                                food_editabled_date:'food editabled timestamp'
                            }
                        }
                    })
                }
                else if (body[0]) { e_1f522 = parseInt(body[0].number) + 1; e_1f4dd(); }
                else { e_1f522 = '1'; e_1f4dd(); }
            });
        } else {
            res.json({
                status:'missing parameters',
                missing_parameters:{
                    body:{
                        food_type:!e_1f354,
                        food_name:!e_1f953,
                        food_date:!req.body.food_date,
                        food_editabled_date:!req.body.food_editabled_date
                    }
                }
            })
        }

        function e_1f4dd(){
            con.query("INSERT INTO "+e_1f354+" (number, name, date, editable) VALUES ('"+e_1f522+"', '"+e_1f953+"', '"+e_1f4c6+"', '"+e_1f4c6e_1f510+"')", function (err, body, fields) {
                if (err) throw err;
                res.json({
                    status:'created new food',
                    new_food_info:{
                        food_type:e_1f354,
                        food_name:e_1f953,
                        food_date:e_1f4c6,
                        food_editabled_date:e_1f4c6e_1f510,
                        food_number:e_1f522
                    }
                })
            });
        }
    })

    app.get('/daily_food', function(req, res) {
        var e_1f354 = req.headers['food_type'], // food_main && food_soap
            e_1f4c6 = timeConverter(req.headers['food_date']); // food serving timestamp

        if (e_1f354 && req.headers['food_date']) {
            con.query("SELECT number, name, date, editable FROM "+e_1f354+" WHERE date = '"+e_1f4c6+"' ORDER BY number", function (err, body, fields) {
                if (err) {
                    res.json({
                        status:'wrong parameters',
                        parameters:{
                            head:{
                                food_type:'main_meal / soup',
                                food_date:'food serving timestamp'
                            }
                        }
                    })
                } else if (body[0]) {
                    res.json({
                        status:'daily food',
                        food_info:body
                    })
                } else {
                    res.json({
                        status:'daily food',
                        food_info:'no '+e_1f354+' today'
                    })
                }
            });
        } else {
            res.json({
                status:'missing parameters',
                missing_parameters:{
                        head:{
                            food_type:!e_1f354,
                            food_date:!req.headers['food_date']
                        }
                }
            })
        }
    })
    
    app.use((err, req, res, next) => {
        if (err instanceof SyntaxError){
            res.status(400).json({'status': "The body of your request is not valid json!"})
        }
    });
    app.get('*', function(req, res) {
        res.status(404).json({'status': "I don't find a function for that... Anyone knows?"})
    });
    app.listen(server_port, () =>
        setTimeout(() => {
            console.log('Web server running.\n\n\thttp://'+ip.address()+':'+server_port+'\n\thttp://localhost:'+server_port+'\n')
        }, 1000)
    )
} else {
    setTimeout(() => {
        console.log('Web server disabled');
    }, 500)
}




