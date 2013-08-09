var map;
function initialize() {
	var center = options.map.center;
  var points = options.map.points;

  var mapOptions = {
    disableDefaultUI: true,
    zoom: 16,
    center: new google.maps.LatLng(center[0], center[1]),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var image = '/images/target.png';
  var myLatLng = new google.maps.LatLng(49.8622, 23.9171);

  for(var i=points.length-1; i>=0; i--) {
    var point = points[i];
    var myLatLng = new google.maps.LatLng(point[1], point[2]);
    var beachMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: point[0],
      icon: '/images/'+point[3]+'.png'
    });
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
