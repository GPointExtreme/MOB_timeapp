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
				tasksdata.name = response[i].name;
				tasksdata.time = response[i].time;
				tasksdata.userid = response[i].userId;
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
