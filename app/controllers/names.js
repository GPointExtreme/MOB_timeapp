var args = $.args;
var names = Alloy.Collections.names;
names.fetch();

function doClick(e) {
	var section = $.liste.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	
	var newWindow = Alloy.createController('tasks', {user: item}).getView();
	newWindow.open();
}

function doClick2(e) {
	var neu = Ti.API.info($.neuer.value);
	
	var connection = require('connection');
	connection.newuser({
		success: function() {
			names.fetch();
			Ti.API.info(JSON.stringify(names));
		}, username: $.neuer.value
	});
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

