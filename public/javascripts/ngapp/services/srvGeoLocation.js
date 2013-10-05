app.factory('Geolocation', function($rootScope, $q) {
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

  function validOptions(options) {
    var locOptions = options || { 
      enableHighAccuracy: true, 
      maximumAge: 60000, // 1 min
      timeout: 30000 // 30 sec
    };
    return locOptions;
  }

  return {
    watch: function(options) {
      if (!navigator.geolocation) {
        return false;
      }

      var watchId = navigator.geolocation.watchPosition(
        positionOk, 
        positionError, 
        validOptions(options)
      );
      return watchId;
    },
    position: function (options) {
      if (!navigator.geolocation) {
        return false;
      }

      var deferred = $q.defer()
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          $rootScope.$apply(function () {
            deferred.resolve(pos.coords)
          })
        }, 
        function (error) {
          $rootScope.$apply(function () {
            deferred.reject(error)
          })
        },
        validOptions(options)
      );
      return deferred.promise
    }
  };
});
