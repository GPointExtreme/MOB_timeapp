var names = Alloy.Collections.names;
names.fetch();

var connection = require('connection');
connection.getusers({
	success: function() {
		names.fetch();
		Ti.API.info(JSON.stringify(names));
	}
});

var tasks = Alloy.Collections.tasks;
tasks.fetch();


connection.gettasks({
	success: function() {
		tasks.fetch();
	}
});

function doClick(e) {
	var newWindow = Alloy.createController('names', {}).getView();
	newWindow.open();
} //wos dua i do

$.index.open();