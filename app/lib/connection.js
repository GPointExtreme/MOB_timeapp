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
