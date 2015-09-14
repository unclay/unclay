"use strict";
var base = require("./base");
var Model = require("./model");

var sessions = {};
var key = "__clid";
var EXPIRES = 1 * 60 * 1000;

var setEnd = function(req, res, next, session){
	var host = req.headers.host.split(".");
	host = "."+host[host.length-2]+"."+host[host.length-1];
	req.session = session;
	// if( req.headers.referer.indexOf("/admin/logout.wcl") >= 0 ){
	// 	res.setHeader('Set-Cookie', key+'='+req.session.id+';domain='+host+';path=/;Expires='+new Date(1000000).toGMTString()+';httpOnly=true');
	// } else 
	// res.setHeader('Set-Cookie', key+'='+req.session.id+';domain='+host+';path=/;Expires='+new Date(req.session.cookie.expire).toGMTString()+';httpOnly=true');
	next();
}

var generate = function(req, res, next, sessionid){
	var session = {};
	session.id = sessionid || (new Date().getTime() + Math.random() + "");
	session.cookie = {
		expire: (new Date()).getTime() + EXPIRES
	};
	Model.Msl.use(function(dbthen) {
		var p = Model.Session.findOne({
			__clid: session.id
		}).exec();
		p.then(function(doc, err){
			if( doc ){
				session = doc.value;
				session.cookie.expire = (new Date()).getTime() + EXPIRES;
				sessions[session.id] = session;
                setEnd(req, res, next, session);
			} else next();
		});
	}, function(err){
		next();
	});
}

module.exports = function(opt){
	if( opt ){
		key = opt.key || key;
		EXPIRES = opt.expires || EXPIRES;
	}
	return function(req, res, next){
		var id = req.cookies[key];
		if( !!id ){
			var session = sessions[id];
			if( !!session && !!session.user ){
				if( session.cookie.expire > new Date().getTime() ){
					session.cookie.expire = new Date().getTime() + EXPIRES;
					setEnd(req, res, next, session);
				} else {
					delete sessions[id];
					next();
					// generate(req, res, next);
				}
			} else {
				generate(req, res, next, id);
			}
		} else next();
	}
}