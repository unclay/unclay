"use strict";
var path = require("path");
var fs = require("fs");
// 首页
exports.index = function(req, res) {
	res.locals.layout = "layout"
    res.jrender("index", {
    	title: "unclay"
    });
}
// 网站历程
exports.history = function(req, res) {
    res.jrender("history", {
    	title: "unclay"
    });
}
// 博客
exports.note = function(req, res) {
    res.jrender("note", {
    	title: "unclay"
    });
}

