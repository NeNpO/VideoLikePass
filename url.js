
self.port.on("getElements", function(tag) {
	var divTag = document.getElementsByClassName(tag);
	for (var i = 0; i < divTag.length; i++) {
		self.port.emit("gotElement", divTag[i].innerHTML);
	}
});
