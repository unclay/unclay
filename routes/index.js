var R_base = require("./base");
var Model = require("./model");
var R_admin = require("./admin");
module.exports = function(app){
	R_admin(app);

	app.get("/", R_base.index);
	app.get("/history", R_base.history);
	app.get("/note", R_base.note);

	// app.get( "/note/:uri" , function(req, res, next){
	// 	Model.Msl.use(function(callback){
	// 		Model.Note
	// 			.find()
	// 			.where({
	// 				seo_url: req.params.uri
	// 			}, ["_id", "seo_title", "seo_keywords", "seo_description", "artical_title"])
	// 			.exec(callback);
	// 	}, function(err, data){
	// 		if(err){
	// 			next(err);
	// 		} else if( isOwnEmpty(data) ){
	// 			next(new Error());
	// 		} else {
	// 			res.jrender("note", {
			    	
	// 		    });
	// 		}
			
	// 	});
	// });
}