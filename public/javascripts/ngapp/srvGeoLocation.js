app.factory('Geolocation', function($rootScope) {
  function positionOk(position) {
    $rootScope.$apply(function() {
      $rootScope.$broadcast("locationUpdated", {
          valid: true,
          coords: position.coords
      });
    });
  }

  function positionError(error) {
    $rootScope.$apply(function() {
      $rootScope.$broadcast("locationUpdated", {
          valid: false
      });
    });
  }

  return {
    watch: function(options) {
      var locOptions = options || { 
        enableHighAccuracy: true, 
        maximumAge: 60000, // 1 min
        timeout: 30000 // 30 sec
      };

      if (!navigator.geolocation) {
        return false;
      }

      var watchId = navigator.geolocation.watchPosition(
        positionOk, 
        positionError, 
        locOptions
      );
      return watchId;
    }
  };
});
