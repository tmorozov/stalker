app.controller('ctrAuth', function ($scope, User) {
  $scope.user = User.user;

  $scope.login = function () {
    $scope.user.active = true;
    $scope.goTo('quests');
  }
});

