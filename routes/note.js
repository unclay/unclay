"use strict";
var R_base = require("./base");
var Config = require("../config/config.json");
var Model = require("./model");
var marked = require("marked");
var moment = require("moment");
exports.note = function(req, res, next) {
	// var page = req.params.page || 1;
	// var limit = Config.application.note.limit || 10;
	Model.Msl.use(function(callback) {
		var note;
	    var p = Model.Note
	        .find()
	        .populate("tag")
	        .sort({
	        	"createtime": "desc"
	        })
	        // .skip( page*limit-limit )
	        // .limit(limit)
	        .exec();
	    p.then(function(data){
	    	note = data;
	    	return Model.Total
	    				.find()
	    				.select("-content")
	    				.deepPopulate("tagid", {
	    					"populate": {
	    						tagid: {
	    							select: "name"
	    						}
	    					}
	    				})
	    				.exec();
	    	
	    }).then(function(data){
	    	var _note = [];
	    	var _list = {};
	    	var _year = 0;
	    	var _tag = [];
	    	for(var i=0; i<note.length; i++){
	    		var year = note[i].createtime.getFullYear();
	    		_tag = [];
	    		for( var j=0; j<note[i].tag.length; j++ ){
	    			//_tag.push(note[i].ag)
	    		}
	    		note[i] = JSON.parse( JSON.stringify(note[i]) );
	    		if( _year != year ){
	    			_year = year;
	    			_list = [];
	    			if( _year != 0 ) _note.push({
	    				year: _year,
	    				list: _list
	    			});
	    		}
	    		_list.push(note[i]);
	    		if( i == note.length-1 ){
	    			_note.push({
	    				year: _year,
	    				list: _list
	    			});
	    		}
	    	}
	    	_list = _year = _tag = note = null;
	    	res.jrender("note", {
		    	list: _note,
		    	tag: data
		    });
	    }).then(null, callback);
	}, function(err) {
	    next(err);
	});
}

exports.note_tag = function(req, res, next) {
	// var page = req.params.page || 1;
	// var limit = Config.application.note.limit || 10;
	Model.Msl.use(function(callback) {
		var note;
	    var p = Model.Note
	        .find()
	        .populate("tag")
	        .sort({
	        	"createtime": "desc"
	        })
	        // .skip( page*limit-limit )
	        // .limit(limit)
	        .exec();
	    p.then(function(data){
	    	note = data;
	    	return Model.Total
	    				.find()
	    				.select("-content")
	    				.deepPopulate("tagid", {
	    					"populate": {
	    						tagid: {
	    							select: "name"
	    						}
	    					}
	    				})
	    				.exec();
	    	
	    }).then(function(data){
	    	var _note = [];
	    	var _list = {};
	    	var _year = 0;
	    	var _tag = [];
	    	for(var i=0; i<note.length; i++){
	    		var year = note[i].createtime.getFullYear();
	    		_tag = [];
	    		for( var j=0; j<note[i].tag.length; j++ ){
	    			//_tag.push(note[i].ag)
	    		}
	    		note[i] = JSON.parse( JSON.stringify(note[i]) );
	    		if( _year != year ){
	    			_year = year;
	    			_list = [];
	    			if( _year != 0 ) _note.push({
	    				year: _year,
	    				list: _list
	    			});
	    		}
	    		_list.push(note[i]);
	    		if( i == note.length-1 ){
	    			_note.push({
	    				year: _year,
	    				list: _list
	    			});
	    		}
	    	}
	    	_list = _year = _tag = note = null;
	    	res.jrender("note", {
		    	list: _note,
		    	tag: data
		    });
	    }).then(null, callback);
	}, function(err) {
	    next(err);
	});
}

exports.note_item = function(req, res, next) {
	Model.Msl.use(function(callback) {
	    var note;
	    var p = Model.Note
	        .findOne()
	        .where({
	            seo_url: req.params.uri
	        }, ["_id", "seo_title", "seo_keywords", "seo_description", "artical_title"])
	        .deepPopulate("tag", {
	        	"populate": {
	        		"tag": {
	        			"select": "name"
	        		}
	        	}
	        })
	        .exec();
	    p.then(function(data){
	    	note = data;
	    	return Model.Total
	    				.find()
	    				.select("-content")
	    				.deepPopulate("tagid", {
	    					"populate": {
	    						tagid: {
	    							select: "name"
	    						}
	    					}
	    				})
	    				.exec();
	    }).then(function(data){
	    	note.content = marked(note.content);
	    	note = JSON.parse( JSON.stringify(note) );
	    	res.jrender("note_item", {
		    	note: note,

		    	tag: data
		    });
	    }).then(null, callback);
	}, function(err) {
	    next(err);
	});
}
