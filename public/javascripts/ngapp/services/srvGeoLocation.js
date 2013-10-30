app.factory('Geolocation', function($rootScope, $q) {
  var positionValue = {
    valid: false
  };

  var validOptions = {
    enableHighAccuracy: true,
    maximumAge: 60000, // 1 min
    timeout: 30000 // 30 sec
  };

  function positionOk(position) {
    $rootScope.$apply(function() {
      positionValue.valid = true;
      positionValue.coords = position.coords;
    });
  }

  function positionError(error) {
    $rootScope.$apply(function() {
      positionValue.valid = false;
    });
  }

  function watch(options) {
    if (!navigator.geolocation) {
      return false;
    }

    var watchId = navigator.geolocation.watchPosition(
      positionOk,
      positionError,
      validOptions
    );
    return watchId;
  }

  watch();

  return {
    positionValue: function () {
      return positionValue;
    }
  };
});
