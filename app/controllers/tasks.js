var args = $.args;
var tasks = Alloy.Collections.tasks;
tasks.fetch();

Ti.API.info(JSON.stringify(args.user));

function doClick2(e) {
	var neu = Ti.API.info($.neuer.value);	
}

function filterFunction(collection) {
	var re = tasks.where({
		userid: args.user.properties.userid
	});
	Ti.API.info(JSON.stringify(re));
	return re;
}