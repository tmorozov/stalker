
angular.module('main', []).
config(function($routeProvider) {
  $routeProvider.
    when('/quests', {controller: ctrQuests, templateUrl:'partials/quests'}).
    when('/auth', {controller: ctrAuth, templateUrl:'partials/auth'}).
    when('/map', {controller: ctrMap, templateUrl:'partials/map'}).
    otherwise({redirectTo:'/quests'});
}).
run(function ($rootScope, $location) {
  $rootScope.locations = ['map', 'quests'];
  
  $rootScope.goTo = function(location) {
    $location.path('/'+location);
  }

  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    if(!$rootScope.user) {
      $location.path('/auth');
    }
  });

});

function ctrAuth($rootScope, $scope, $location) {
  $scope.login = function () {
    $rootScope.user = {
      name: $scope.name,
      pwd: $scope.pwd
    }
    $location.path('/quests');
  }
}

function ctrQuests($scope) {
  $scope.location = 'Quests';
}

function ctrMap($scope) {
  $scope.location = 'Map';

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

    var markers = [];

    for(var i=points.length-1; i>=0; i--) {
      var point = points[i];
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(point[1], point[2]),
        map: map,
        title: point[0],
        icon: '/images/'+point[3]+'.png'
      });

      markers.push(marker);
    }

    return markers;
  }

  function removeMarker(marker) {
    if(!marker) {
      return;
    }
    marker.setMap(null);
  }

  function displayPosition(position) {
    displayPosition.counter++;
    var points = [
      ["Я", position.coords.latitude, position.coords.longitude, "me"]
    ];

    removeMarker($scope.myPosition);
    $scope.myPosition = showOverlay($scope.map, points);

    console.log("Lat: " + position.coords.latitude + 
      ", Lon: " + position.coords.longitude +
      ", accuracy:" + position.coords.accuracy +
      ", counter:" + displayPosition.counter +
      ", timestamp: " + new Date(position.timestamp));
  }

  displayPosition['counter'] = 0;

  function displayError(error) {
    var errors = { 
      1: 'Permission denied',
      2: 'Position unavailable',
      3: 'Request timeout'
    };
    console.log("Error: " + errors[error.code]);
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

  var points = [
    ["npc1",49.862155,23.916207,"npc"],
    ["npc2",49.864416,23.921962,"npc"],
    ["npc3",49.860313,23.925817,"npc"],
    ["2b2",49.86498,23.916439,"target"],
    ["6i4",49.863714,23.919054,"target"]
  ];

  $scope.center = function (group) {
    if(group === 'me' && $scope.myPosition ) {
      console.log($scope.myPosition);
      $scope.map.setCenter($scope.myPosition[0].getPosition());
    }
  }

  $scope.groups = ['me', 'targets', 'npc', 'ppl'];
  $scope.map = initializeMap();
  $scope.markers = showOverlay($scope.map, points);
  $scope.myPosition = false;
  activateMyPosition();
}