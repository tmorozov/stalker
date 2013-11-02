app.factory('Locations', function($rootScope, $http, Geolocation, User) {

  var locations = {
    me: {
      name: 'Я',
      location: [49.8622, 23.9171],
      type: 'me'
    },

    oponents: [],

    center: {
      name: 'Центр',
      location: [
          49.79808329881455,
          24.08562272787094
        ],
      type: 'center'
    },

    npcs: [{
      name: 'Мертвяк',
      location: [49.86209461993709, 23.91571283340454],
      type: 'npc'
    }],

    targets: [
      {
        "name": "вход в лес",
        "location": [
          49.79808329881455,
          24.08562272787094
        ],
        "type": "target"
      },
      {
        "name": "мусорка",
        "location": [
          49.80515869058806,
          24.081602096557617
        ],
        "type": "target"
      },
      {
        "name": "родник",
        "location": [
          49.80386383443098,
          24.09152626991272
        ],
        "type": "target"
      },
      {
        "name": "водопад",
        "location": [
          49.80536641829856,
          24.10001277923584
        ],
        "type": "target"
      }
    ],

    syncronize: syncronize
  };

  function syncronize() {
    var options = {
      headers: {
        "Token": User.user.token
      }
    };

    $http.put('/positions/me', {
      location: locations.me.location
    }, options);

    $http.get('/positions', options).
      success(function(data, status, headers, config) {
        locations.oponents = data;
    });
  }

  $rootScope.$watch(
    function () {return Geolocation;},
    function(position) {
    if (position && position.valid /*&& position.coords.accuracy < 30*/) {
      locations.me.location = [position.coords.latitude, position.coords.longitude];
    }
  }, true);

  return locations;
});
