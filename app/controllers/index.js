var names = Alloy.Collections.names;
names.fetch();

var connection = require('connection');

//Zusammenfassen von beiden Funktionen mit if clause If local Collection hat eintrag mit 0 dann reload 
//Else Load
//soll User die es nur lokal gibt finden und beim Server anlegen
/*
connection.reloade({
	success: function() {
		names.fetch();
		Ti.API.info(JSON.stringify(names));
	}
});
*/

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