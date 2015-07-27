var R_base = require("./base");
module.exports = function(app){
	app.get("/", R_base.rindex);
	app.get("/history", R_base.rhistory);
}