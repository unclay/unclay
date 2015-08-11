var R_base = require("./base");
module.exports = function(app){
	app.get("/", R_base.index);
	app.get("/history", R_base.history);
	app.get("/note", R_base.note);
}