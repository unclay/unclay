module.exports = function(app){
	var auth = function(req, res, next){
		if( !req.session || !req.session.user ){
			res.redirect("/admin/login.wcl");
		} else next();
	}

	app.get("/admin/index.wcl", auth, function(req, res){

		res.locals.layout = "admin/layout";
		res.jrender("admin/index", {
	    	title: "unclay"
	    });
	});

	app.get("/admin/note.wcl", auth, function(req, res){
		res.locals.layout = "admin/layout";
		res.jrender("admin/note", {
	    	title: "unclay"
	    });
	});

	app.get("/admin/note/insert.wcl", auth, function(req, res){
		res.locals.layout = "admin/layout";
		res.jrender("admin/note.insert", {
	    	title: "unclay"
	    });
	});

	app.get("/admin/note/update.wcl", auth, function(req, res){
		res.locals.layout = "admin/layout";
		res.jrender("admin/note.update", {
	    	title: "unclay"
	    });
	});

	app.get("/admin/tag.wcl", auth, function(req, res){
		res.locals.layout = "admin/layout";
		res.jrender("admin/tag", {
	    	title: "unclay"
	    });
	});

	app.get("/admin/login.wcl", function(req, res){
		res.locals.layout = "";
		res.jrender("admin/login", {
	    	title: "unclay"
	    });
	});

	app.get("/admin/logout.wcl", function(req, res){
		req.session = {};
		res.redirect("/admin/login.wcl");
	});
}