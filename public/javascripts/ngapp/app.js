
angular.module('main', []).
config(function($routeProvider) {
  $routeProvider.
    when('/quests', {controller: ctrQuests, templateUrl:'partials/quests'}).
    when('/auth', {controller: ctrAuth, templateUrl:'partials/auth'}).
    when('/map', {controller: ctrMap, templateUrl:'partials/map'}).
    otherwise({redirectTo:'/quests'});
}).
run(function ($rootScope, $location) {
  $rootScope.showNav = true;
  $rootScope.togleNav = function () {
    $rootScope.showNav = !$rootScope.showNav;
  }


  $rootScope.locations = ['map', 'quests'];
  $rootScope.isActive = function (location) {
    return location === $rootScope.currentLocation;
  }
  $rootScope.goTo = function(location) {
    $rootScope.currentLocation = location;
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
    $rootScope.goTo('quests');
    // $location.path('/quests');
  }
}

