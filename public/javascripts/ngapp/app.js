var app = angular.module('main', []);
app.config(function($routeProvider) {
  $routeProvider.
    when('/quests', {controller: 'ctrQuests', templateUrl:'partials/quests'}).
    when('/auth', {controller: 'ctrAuth', templateUrl:'partials/auth'}).
    when('/map', {controller: 'ctrMap', templateUrl:'partials/map'}).
    otherwise({redirectTo:'/quests'});
});

app.run(function ($rootScope, $location, User) {
  $rootScope.user = User.user;

  $rootScope.tabs = ['map', 'quests'];
  $rootScope.isActive = function (tab) {
    return tab === $rootScope.currentTab;
  }
  $rootScope.goTo = function(tab) {
    $rootScope.currentTab = tab;
    $location.path('/'+tab);
  }

  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    if(!$rootScope.user.active) {
      $location.path('/auth');
    }
  });
});

app.run(function ($rootScope, Geolocation) {
  $rootScope.navState = 'error';
  $rootScope.$on("locationUpdated", function (event, position) {
    if(position.valid) {
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
