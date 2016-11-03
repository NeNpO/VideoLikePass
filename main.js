//This Addon created by Lefteris NeNpO!
//Special thanks to Alfredos AkA Fredy!!!
var buttons = require('sdk/ui/button/action');
var tag = "youtubeblocker";
var tagName = "style"
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var tabs = require("sdk/tabs");
var videoUrl = "keno"

var button = buttons.ActionButton({
	id: "VLP",
	label: "There isn't a blocked Youtube Video.",
	icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png"
	},
	disabled: true,
	onClick: handleClick
});

pageMod.PageMod({
  include: "*",
	contentScriptFile: data.url("url.js"),
    onAttach: function onAttach(worker) {
		worker.port.emit("getElements", tag);
		worker.port.on("gotElement", function(elementContent) {
//			console.log(elementContent);
			var splitUrl= elementContent;
			var pathArray = splitUrl.split( '/' );
			videoUrl = pathArray[4];
//			console.log(videoUrl);
			handleChange();
		});
	}
});

function handleChange(state){
	if (videoUrl != "keno") {
//		console.log("Allagi eikonidiou")
		button.state("window", {
		disabled: false,
		label: "There is a blocked Youtube Video. Click to watch it in a new Tab.",
		icon: {
			"16": "./gicon-16.png",
			"32": "./gicon-32.png",
			"64": "./gicon-64.png"
		}
		});
	};
};

function handleClick(state) {
	tabs.open("https://www.youtube.com/watch?v=" + videoUrl);
	button.state("window", {
	disabled: true,
	label: "There isn't a blocked Youtube Video.",
	icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png"
	}
	});
};

