app.controller('ctrAuth', function ($rootScope, $scope) {
  $scope.login = function () {
    $rootScope.user = {
      name: $scope.name,
      pwd: $scope.pwd
    }
    $rootScope.goTo('quests');
  }
});

