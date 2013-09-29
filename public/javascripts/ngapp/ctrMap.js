function ctrMap($scope, Geolocation) {

  function initializeMap(center) {

    var mapOptions = {
      disableDefaultUI: true,
      zoom: 16,
      center: new google.maps.LatLng(center[0], center[1]),
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

  $scope.center = function (location) {
    $scope.map.setCenter(new google.maps.LatLng(location[0], location[1]));
  }

  var mapCenter = [49.8622, 23.9171];

  $scope.me = {
    name: 'Я',
    location: [49.8622, 23.9171],
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

  $scope.map = initializeMap(mapCenter);
  showOverlay($scope.map, $scope.targets);
  showOverlay($scope.map, $scope.npcs);
  // no Me marker before position set
  // showOverlay($scope.map, [$scope.me]);

  function updateMePosition(position) {
    removeMarker($scope.me.marker);
    if(position.valid && position.coords.accuracy < 30) {
      $scope.me.location = [position.coords.latitude, position.coords.longitude];
      showOverlay($scope.map, [$scope.me]);
    }
  }

  $scope.$on("locationUpdated", function (event, position) {
    updateMePosition(position);
  });

  Geolocation.position().then(function(position) {
    updateMePosition(position);
  });
}
