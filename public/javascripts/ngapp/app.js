var app = angular.module('main', []);
app.config(function($routeProvider) {
  $routeProvider.
    when('/quests', {controller: ctrQuests, templateUrl:'partials/quests'}).
    when('/auth', {controller: ctrAuth, templateUrl:'partials/auth'}).
    when('/map', {controller: ctrMap, templateUrl:'partials/map'}).
    otherwise({redirectTo:'/quests'});
});

app.run(function ($rootScope, $location) {
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
  }
}

app.run(function ($rootScope, Geolocation) {
  $rootScope.navState = 'error';
  $rootScope.$on("locationUpdated", function (event, position) {
    if(position.valid) {
      console.log(position.coords);
      if(position.coords.accuracy < 30) {
        $rootScope.navState = 'ok';
      } else {
        $rootScope.navState = 'warning';
      }
    } else {
      $rootScope.navState = 'error';
    }
  });

  Geolocation.watch();
});
