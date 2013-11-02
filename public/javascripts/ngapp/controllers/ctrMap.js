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

  function initImg() {

    var imageBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(49.796500, 24.08200),
      new google.maps.LatLng(49.811700, 24.11100));

      var imgOverlay = new google.maps.GroundOverlay(
        '/images/syhov55_5.jpg',
        imageBounds
      );
    return imgOverlay;
  }

  function showOverlay(map, points) {
    if(! points) {
      return [];
    }

    for(var i=points.length-1; i>=0; i--) {
      var point = points[i];

      if (point.location) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(point.location[0], point.location[1]),
          map: map,
          title: point.name,
          icon: '/images/'+point.type+'.png'
        });

        point.marker = marker;
      }
    }
  }

  function removeMarker(marker) {
    marker && marker.setMap(null);
  }

  // function showDistanceTo(point1, point2) {
  //   if (point1 && point2) {
  //     var point1loc = new google.maps.LatLng(point1.location[0], point1.location[1]);
  //     var point2loc = new google.maps.LatLng(point2.location[0], point2.location[1]);

  //     console.log(google.maps.geometry.spherical.computeDistanceBetween (point1loc, point2loc));

  //   }
  // }

  $scope.center = function (point) {
    if (point && point.location) {
      $scope.map.setCenter(new google.maps.LatLng(point.location[0], point.location[1]));
      // $scope.target = point;
      // showDistanceTo($scope.me, $scope.target);
    }
  }

  $scope.zoomIn = function () {
    $scope.map.setZoom($scope.map.getZoom()+1);
  }

  $scope.zoomOut = function () {
    $scope.map.setZoom($scope.map.getZoom()-1);
  }

  function showImg() {
    $scope.imgOverlay.setMap($scope.map);
  }

  function hideImg() {
    $scope.imgOverlay.setMap(null);
  }

  $scope.$watch(
    function(){return Locations.me;},
    function(positionMe) {
    if (positionMe) {
      removeMarker($scope.me.marker);
      $scope.me = angular.copy(positionMe);
      showOverlay($scope.map, [$scope.me]);

      // showDistanceTo($scope.me, $scope.target);
    }
  }, true);

  $scope.$watch(
    function(){return Locations.oponents;},
    function(oponents) {
    if (oponents) {
      $scope.oponents.forEach(function(item){
        removeMarker(item.marker);
      });

      $scope.oponents = angular.copy(Locations.oponents);
      showOverlay($scope.map, $scope.oponents);
    }
  }, true);

  $scope.syncronize = function () {
    Locations.syncronize();
  }

  $scope.togleImg = function() {
    if ($scope.imgOverlay.getMap()) {
      hideImg();
    } else {
      showImg();
    }

  }

  $scope.me = angular.copy(Locations.me);
  $scope.npcs = Locations.npcs;
  $scope.targets = Locations.targets;
  $scope.oponents = angular.copy(Locations.oponents);

  // $scope.target = $scope.npcs[0];

  $scope.map = initializeMap(Locations.center);
  $scope.imgOverlay = initImg();

  showImg();


  showOverlay($scope.map, $scope.targets);
  showOverlay($scope.map, $scope.npcs);
  showOverlay($scope.map, $scope.oponents);


});
