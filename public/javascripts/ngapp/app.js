var app = angular.module('main', []).
config(function($routeProvider) {
  $routeProvider.
    when('/quests', {controller: ctrQuests, templateUrl:'partials/quests'}).
    when('/auth', {controller: ctrAuth, templateUrl:'partials/auth'}).
    when('/map', {controller: ctrMap, templateUrl:'partials/map'}).
    otherwise({redirectTo:'/quests'});
}).
run(function ($rootScope, $location) {
  $rootScope.tabs = ['map', 'quests'];
  $rootScope.isActive = function (tab) {
    return tab === $rootScope.currentTab;
  }
  $rootScope.goTo = function(tab) {
    $rootScope.currentTab = tab;
    $location.path('/'+tab);
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

