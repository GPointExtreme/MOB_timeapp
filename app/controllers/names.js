function doClick2(e) {
	var neu = Ti.API.info($.neuer.value);
}

function doClick(e) {
	var newWindow = Alloy.createController('tasks', {}).getView();
	newWindow.open();
}