var R_base = require("./base");
var Model = require("./model");
var R_admin = require("./admin");
var R_note = require("./note");
var marked = require("marked");
module.exports = function(app){
	R_admin(app);

	app.get("/", R_base.index);
	app.get("/history", R_base.history);
	app.get("/note", R_note.note);

	app.get( "/note/:uri" , R_note.note_item);
}