"use strict";
var R_base = require("./base");
var Model = require("./model");
exports.note = function(req, res, next) {
	Model.Msl.use(function(callback) {
	    var p = Model.Note
	        .find()
	        .exec();
	    p.then(function(data){
	    	res.jrender("note", {
		    	list: data
		    });
	    }).then(null, callback);
	}, function(err) {
	    next(err);
	});
}


exports.note_item = function(req, res, next) {
	Model.Msl.use(function(callback) {
	    Model.Note
	        .findOne()
	        .where({
	            seo_url: req.params.uri
	        }, ["_id", "seo_title", "seo_keywords", "seo_description", "artical_title"])
	        .exec(callback);
	}, function(err, data) {
	    if (err) {
	        next(err);
	    } else {
	        data.content = marked(data.content);
	        res.jrender("note_item", data);
	    }
	});
}
