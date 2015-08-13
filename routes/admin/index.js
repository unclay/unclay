module.exports = function(app){

	app.get("/admin/index.wcl", function(req, res){
		res.locals.layout = "admin/layout";
		res.jrender("admin/index", {
	    	title: "unclay"
	    });
	});

	app.get("/admin/note.wcl", function(req, res){
		res.locals.layout = "admin/layout";
		res.jrender("admin/note", {
	    	title: "unclay"
	    });
	});

	app.get("/admin/note/insert.wcl", function(req, res){
		res.locals.layout = "admin/layout";
		res.jrender("admin/note.insert", {
	    	title: "unclay"
	    });
	});
}