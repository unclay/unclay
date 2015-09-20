module.exports = function(juicer){
	juicer.register("getYMD", function(time, format){
		format = format || 'y-m-d';
		var t = new Date(time*1000);
        t = format.replace("y", t.getFullYear())
                        .replace("m", t.getMonth()+1)
                        .replace("d", t.getDate())
        return t;
	});
}