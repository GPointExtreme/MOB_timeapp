exports.getusers = function(o) {
	if (Titanium.Network.networkType != Titanium.Network.NETWORK_NONE) {
		var xhr = Titanium.Network.createHTTPClient({});
		
		var params = {};
		
		xhr.open('GET', Ti.App.Properties.getString('basisURL') + 'users');
		
		xhr.onload = function(e) {
			var response = JSON.parse(this.responseText);
			Ti.API.info(this.responseText);
			var names = Alloy.Collections.names;
			
			//Backbone Inhalt der Tabelle von Usern löschen
			names.fetch();
			while(names.length > 0) {
				var object = names.at(0);
				names.remove(object);
				object.destroy();
			}
			
			for(var i = 0; i < response.length; i++) {
				var namesdata = {};
				namesdata.name = response[i].username;
				namesdata.userid = response[i].id;
				var name = Alloy.createModel('names', namesdata);

				names.add(name);
				name.save();
			}
			if(o.success) {
				o.success();
			}
		};
		
		xhr.send(params);
	}
};

exports.gettasks = function(o) {
	if (Titanium.Network.networkType != Titanium.Network.NETWORK_NONE) {
		var xhr = Titanium.Network.createHTTPClient({});
		
		var params = {};
		
		xhr.open('GET', Ti.App.Properties.getString('basisURL') + 'tasks');
		
		xhr.onload = function(e) {
			var response = JSON.parse(this.responseText);
			Ti.API.info(this.responseText);
			var tasks = Alloy.Collections.tasks;
			
			//Backbone Inhalt der Tabelle von Tasks löschen
			tasks.fetch();
			while(tasks.length > 0) {
				var object = tasks.at(0);
				tasks.remove(object);
				object.destroy();
			}
			
			for(var i = 0; i < response.length; i++) {
				var tasksdata = {};
				tasksdata.taskid = response[i].taskid;
				tasksdata.name = response[i].name;
				tasksdata.time = response[i].time;
				tasksdata.userid = response[i].userid;
				var task = Alloy.createModel('tasks', tasksdata);

				tasks.add(task);
				task.save();
			}
			if(o.success) {
				o.success();
			}
		};
		
		xhr.send(params);
	}
};

exports.newuser = function(o) {
	if (Titanium.Network.networkType != Titanium.Network.NETWORK_NONE) {
		var xhr = Titanium.Network.createHTTPClient({});
		
		var params = {"username":o.username};
		
		xhr.open('POST', Ti.App.Properties.getString('basisURL') + 'users');
		
		xhr.onload = function(e) {
			var response = JSON.parse(this.responseText);
			Ti.API.info(this.responseText);
			var names = Alloy.Collections.names;
		};
		
			if(o.success) {
				o.success();
			}
		xhr.send(params);
	};
	var names = Alloy.Collections.names;
	Ti.API.info("Do sama eh");
	
	//Damit hinzufügen auch offline funktioniert
	var namesdata = {};
	namesdata.name = o.username;
	namesdata.userid = 0;
	var name = Alloy.createModel('names', namesdata);
	names.add(name);
	name.save();

	names.fetch();
	Ti.API.info(JSON.stringify(names));
	
	//Lokale Daten wegwerfen falls wir eh mit dem Server verbunden sind
	exports.getusers({
		success: function() {
			names.fetch();
			Ti.API.info(JSON.stringify(names));
		}
	});
	
};

//Tasks anlegen/hinzufügen
exports.newtask = function(o) {
	if (Titanium.Network.networkType != Titanium.Network.NETWORK_NONE) {
		var xhr = Titanium.Network.createHTTPClient({});
		
		var params = {"name":o.name, "userid":o.userid};
		Ti.API.info(JSON.stringify(o));
		
		xhr.open('POST', Ti.App.Properties.getString('basisURL') + 'tasks');
		
		xhr.onload = function(e) {
			var response = JSON.parse(this.responseText);
			Ti.API.info(this.responseText);
			var tasks = Alloy.Collections.tasks;
		};
		
			if(o.success) {
				o.success();
			}
		xhr.send(params);
	};
	var tasks = Alloy.Collections.tasks;
	Ti.API.info("Do sama eh");
	
	//Damit hinzufügen auch offline funktioniert
	var tasksdata = {};
	tasksdata.name = o.name;
	tasksdata.userid = o.userid;
	tasksdata.taskid = 0;
	var task = Alloy.createModel('tasks', tasksdata);
	tasks.add(task);
	task.save();

	tasks.fetch();
	Ti.API.info(JSON.stringify(tasks));
	
	//Lokale Daten wegwerfen falls wir eh mit dem Server verbunden sind
	exports.gettasks({
		success: function() {
			tasks.fetch();
			Ti.API.info(JSON.stringify(tasks));
		}
	});
	
};

//soll User die es nur lokal gibt finden und beim Server anlegen
exports.reloade = function(o) {
	var names = Alloy.Collections.names;
	Ti.API.info("Reloade: " + JSON.stringify(names));
	names.fetch();

	var i = 0;
	while (i < names.length) {
		var object = names.at([i]).toJSON();
		if(object.userid == 0) {
			Ti.API.info(object.userid);
		  	
				var xhr = Titanium.Network.createHTTPClient({});
				
				var params = {"username":object.name};
				
				xhr.open('POST', Ti.App.Properties.getString('basisURL') + 'users');
				
				xhr.onload = function(e) {
					var response = JSON.parse(this.responseText);
					Ti.API.info(this.responseText);
					var names = Alloy.Collections.names;
				};
				
					if(o.success) {
						o.success();
					}
				xhr.send(params);
			};	
	  	
	  	i++;
	};
	if(o.success) {
		o.success();
	}
};
