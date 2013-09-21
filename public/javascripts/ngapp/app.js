
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

function ctrMap($scope, $log) {
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

  function showOverlay(map, markers) {
    var points = markers || [];
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

    return map;
  }

  $scope.map = initializeMap();
  $scope.makrers = showOverlay($scope.map, null);

}