var map;
function initialize() {
	var center = options.map.center.split(',');

  var mapOptions = {
    disableDefaultUI: true,
    zoom: 16,
    center: new google.maps.LatLng(center[0], center[1]),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var image = 'http://team-radar.herokuapp.com/images/target.png';
  var myLatLng = new google.maps.LatLng(49.8622, 23.9171);

  var goals = options.map.goals;
  // [
  //   ['цель 1', 49.8622, 23.9171, 4],
  //   ['цель 2', 49.8623, 23.9172, 5],
  //   ['цель 3', 49.8624, 23.9173, 3],
  //   ['цель 4', 49.8621, 23.9174, 2],
  //   ['цель 5', 49.8620, 23.9175, 1]
  // ];

  for(var i=goals.length-1; i>=0; i--) {
    var goal = goals[i];
    var myLatLng = new google.maps.LatLng(goal[1], goal[2]);
    var beachMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: goal[0],
      icon: image
    });
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
