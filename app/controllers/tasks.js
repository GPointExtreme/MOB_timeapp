var args = $.args;
var tasks = Alloy.Collections.tasks;
var names = Alloy.Collections.names;
tasks.fetch();
names.fetch();

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
			tasks.fetch();
			Ti.API.info(JSON.stringify(tasks));
		}
	});
}

function doClick3(e) {
	var connection = require('connection');
	
	var section = $.liste.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	//Ti.API.info("HIER2" + JSON.stringify(item));
	//Ti.API.info("HIER3" + JSON.stringify(item.properties.taskid));
	//Ti.API.info(item);
	connection.updateTask({
		success: function() {
			tasks.fetch();
			Ti.API.info(JSON.stringify(tasks));
		}, time: $.zeit.value, taskid: item.properties.taskid
	});
}