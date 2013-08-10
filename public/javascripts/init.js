function gotoMaps (e) {
	// var position = app.module.geo.getPosition();
	// alert(position.coords.latitude+','+position.coords.longitude);
	var newUrl = this.href;
	// if (position) {
	// 	newUrl += "?position="+position.coords.latitude+","+position.coords.longitude;
	// }

	window.location.href = newUrl+'?test=true';
	// prevent default
	return false;
}

app.module.geo.init();

document.getElementById("map").onclick = gotoMaps;