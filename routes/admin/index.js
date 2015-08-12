module.exports = function(app){

	app.get("/admin/index.wcl", function(req, res){
		res.locals.layout = "admin/layout";
		res.jrender("admin/index", {
	    	title: "unclay"
	    });
	});
}