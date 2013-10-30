app.controller('ctrMap', function ($scope, Locations) {

  function initializeMap(center) {

    var mapOptions = {
      disableDefaultUI: true,
      zoom: 16,
      center: new google.maps.LatLng(center.location[0], center.location[1]),
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
        icon: '/images/'+point.type+'.png'
      });

      point.marker = marker;
    }
  }

  function removeMarker(marker) {
    marker && marker.setMap(null);
  }

  $scope.center = function (location) {
    $scope.map.setCenter(new google.maps.LatLng(location[0], location[1]));
  }

  $scope.zoomIn = function () {
    $scope.map.setZoom($scope.map.getZoom()+1);
  }
  $scope.zoomOut = function () {
    $scope.map.setZoom($scope.map.getZoom()-1);
  }

  $scope.$watch(
    function(){return Locations.me;},
    function(positionMe) {
    if (positionMe) {
      removeMarker($scope.me.marker);
      $scope.me = angular.copy(positionMe);
      showOverlay($scope.map, [$scope.me]);
    }
  }, true);

  $scope.me = angular.copy(Locations.me);
  $scope.npcs = Locations.npcs;
  $scope.targets = Locations.targets;

  $scope.map = initializeMap(Locations.center);
  showOverlay($scope.map, $scope.targets);
  showOverlay($scope.map, $scope.npcs);

});
