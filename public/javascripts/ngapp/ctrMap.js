function ctrMap($scope) {
  // $scope.location = 'Map';

  function initializeMap() {

    var mapOptions = {
      disableDefaultUI: true,
      zoom: 16,
      center: new google.maps.LatLng(49.8622, 23.9171),
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    return map;
  }

  function showOverlay(map, points) {
    if(! points) {
      return [];
    }

    for(var i=points.length-1; i>=0; i--) {
      var point = points[i];
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(point.location[0], point.location[1]),
        map: map,
        title: point.name,
        icon: '/images/'+point.img+'.png'
      });

      point.marker = marker;
    }
  }

  function removeMarker(marker) {
    if(!marker) {
      return;
    }
    marker.setMap(null);
  }

  function displayPosition(position) {
    displayPosition.counter++;

    $scope.me.location = [position.coords.latitude, position.coords.longitude];

    removeMarker($scope.me.marker);
    showOverlay($scope.map, [$scope.me]);

    console.log("Lat: " + position.coords.latitude + 
      ", Lon: " + position.coords.longitude +
      ", accuracy:" + position.coords.accuracy +
      ", counter:" + displayPosition.counter +
      ", timestamp: " + new Date(position.timestamp));
  }

  displayPosition['counter'] = 0;

  function displayError(error) {
  }

  function activateMyPosition() {
    if (navigator.geolocation) {
      var watchId = navigator.geolocation.watchPosition(
        displayPosition, displayError, { 
          enableHighAccuracy: true, 
          maximumAge: 60000, // 1 min
          timeout: 30000 // 30 sec
        }
      );
    } else {
      return false;
    }
  }

  $scope.center = function (location) {
    $scope.map.setCenter(new google.maps.LatLng(location[0], location[1]));
  }

  $scope.me = {
    name: 'Я',
    location: [49.862155,23.916207],
    img: 'me'
  };

  $scope.npcs = [{
    name: 'Доктор',
    location: [49.862155,23.916207],
    img: 'npc'
  }, {
    name: 'Барыга',
    location: [49.864416,23.921962],
    img: 'npc'
  }, {
    name: 'Бармен',
    location: [49.860313,23.925817],
    img: 'npc'
  }];

  $scope.targets = [{
    name: '2b2',
    location: [49.86498,23.916439],
    img: 'target'
  }, {
    name: '6i4',
    location: [49.863714,23.919054],
    img: 'target'
  }];

  $scope.map = initializeMap();
  showOverlay($scope.map, $scope.targets);
  showOverlay($scope.map, $scope.npcs);
  showOverlay($scope.map, [$scope.me]);

  activateMyPosition();
}
