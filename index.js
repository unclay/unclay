"use strict";
var express = require("express");
var os = require("os");
var path = require("path");
var jTemplate = require("juicer-template");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
// var session = require("express-session");
// var RedisStore = require('connect-redis')(session);
var config = require("./config/config.json");
var routes = require("./routes");
var routes_session = require("./routes/session");

var port = os.cpus()[0].model.indexOf("i5-4690") >= 0 ? 8085 : (os.type().indexOf("Window") >= 0 || os.cpus()[0].model.indexOf("M 380") >= 0) ? 8010 : 18080;
var app = express();
console.log(port)
app.set("port", port);
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "html");
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(jTemplate({
	cache: false,
	domain: config.domain,
	set: {
		'tag::commentOpen': '$#',
    	'tag::commentClose': '$'
	}
}));
app.use(new routes_session());
// app.use(session({
//     secret: "wcl",
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 24 * 60 * 60 * 1000
//     },
//     store: new RedisStore({
//         host: config.redis.host,
//         port: config.redis.port,
//         pass: config.redis.pass,
//         prefix: "wcl:",
//         ttl: 24 * 60 * 60
//     })
// }));
routes(app);

app.listen(app.get("port"), function() {
    console.log("listen to " + app.get("port"));
});

