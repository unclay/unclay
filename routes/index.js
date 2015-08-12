var R_base = require("./base");
var R_admin = require("./admin");
module.exports = function(app){
	R_admin(app);

	app.get("/", R_base.index);
	app.get("/history", R_base.history);
	app.get("/note", R_base.note);
}