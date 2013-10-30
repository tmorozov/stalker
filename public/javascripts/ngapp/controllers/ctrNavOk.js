app.controller('ctrNavOk', function ($scope, Geolocation) {
  $scope.$watch(
    function () {return Geolocation;},
    function(position, oldPosition) {
    if (position && position.valid) {
      $scope.navState = (position.coords.accuracy < 30) ? 'ok' : 'warning';
    } else {
      $scope.navState = 'error';
    }
  }, true);
});

