app.controller('ctrAuth', function ($scope, $http, User) {
  $scope.user = User.user;

  $scope.login = function () {
    $http.post('/securityContext', $scope.user).
      success(function(data, status, headers, config) {
        $scope.user.active = true;
        $scope.user.token  = data.token;
        $scope.goTo('quests');
      }).
      error(function(data, status, headers, config) {
      });
  }
});

