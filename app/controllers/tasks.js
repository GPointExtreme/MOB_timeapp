var args = $.args;
var tasks = Alloy.Collections.tasks;
tasks.fetch();

Ti.API.info(JSON.stringify(args.user));

function doClick2(e) {
	var neu = Ti.API.info($.neuer.value);
	
	var connection = require('connection');
	connection.newtask({
		success: function() {
			tasks.fetch();
			Ti.API.info(JSON.stringify(tasks));
		}, name: $.neuer.value, userid: args.user.properties.userid
	});
}

function filterFunction(collection) {
	var re = tasks.where({
		userid: args.user.properties.userid
	});
	Ti.API.info(JSON.stringify(re));
	return re;
}

function doRefresh(e) {
	var connection = require('connection');
	connection.reloade({
		success: function() {
			names.fetch();
			Ti.API.info(JSON.stringify(names));
		}
	});
}