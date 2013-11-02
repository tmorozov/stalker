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
      "location": [
        49.802845928539206,
        24.094133377075195
      ],
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
      "name": "база морпехов",
      "location": [
        49.800962399974644,
        24.10228729248047
      ],
      "type": "target"
    },
    {
      "name": "база синих",
      "location": [
        49.802845928539206,
        24.094133377075195
      ],
      "type": "target"
    },
    {
      "name": "родник",
      "location": [
        49.803967701175736,
        24.090957641601562
      ],
      "type": "target"
    },
    {
      "name": "водопад",
      "location": [
        49.805518751386415,
        24.09949779510498
      ],
      "type": "target"
    },
    {
      "name": "база Сфинкс",
      "location": [
        49.80738825478661,
        24.092631340026855
      ],
      "type": "target"
    },
    {
      "name": "база Шторм",
      "location": [
        49.801654882229315,
        24.084928035736084
      ],
      "type": "target"
    },
    {
      "name": "база красных",
      "location": [
        49.800782352966095,
        24.096858501434326
      ],
      "type": "target"
    },
    {
      "name": "база желтых",
      "location": [
        49.80265203927617,
        24.098360538482666
      ],
      "type": "target"
    },
    {
      "name": "база военных",
      "location": [
        49.81076702590514,
        24.097137451171875
      ],
      "type": "target"
    },
    {
      "name": "база бобров",
      "location": [
        49.80693127173393,
        24.100849628448486
      ],
      "type": "target"
    }
  ] ,

    syncronize: syncronize
  };

  function syncronize() {
    var options = {
      headers: {
        "Token": User.user.token
      }
    };

    $http.put('/positions/me', {
      location: locations.me.location,
      name: User.user.name
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
