"use strict";
var path = require("path");
var fs = require("fs");
// 首页
exports.rindex = function(req, res) {
	res.locals.layout = "layout"
    res.jrender("index", {
    	title: "unclay"
    });
}
// 网站历程
exports.rhistory = function(req, res) {
    res.jrender("history", {
    	title: "unclay"
    });
}

