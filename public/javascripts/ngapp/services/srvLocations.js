app.factory('Locations', function($rootScope, $http, Geolocation, User) {

  var locations = {
    me: {
      name: 'Я',
      location: [
        49.76180720207909,
        24.12674903869629
      ],
      type: 'me'
    },

    oponents: [],

    center: {
      name: 'Центр',
      location: [
          49.76180720207909,
          24.12674903869629
        ],
      type: 'center'
    },

    npcs: [ {
        "name": "База",
        "location": [
          49.76180720207909,
          24.12674903869629
        ],
        "type": "npc"
      },
      {
        "name": "K1",
        "location": [
          49.760726036604346,
          24.1329288482666
        ],
        "type": "npc"
      },
      {
        "name": "K2",
        "location": [
          49.774723878376925,
          24.146747589111328
        ],
        "type": "npc"
      },
      {
        "name": "K3",
        "location": [
          49.76976272958938,
          24.119110107421875
        ],
        "type": "npc"
      }
    ],

    targets: [
      {
        "name": "x1",
        "location": [
          49.76408034316069,
          24.142112731933594
        ],
        "type": "target"
      },
      {
        "name": "x2",
        "location": [
          49.76757301077837,
          24.144816398620605
        ],
        "type": "target"
      },
      {
        "name": "x3",
        "location": [
          49.77022006343559,
          24.14594292640686
        ],
        "type": "target"
      },
      {
        "name": "x4",
        "location": [
          49.774938665248676,
          24.139634370803833
        ],
        "type": "target"
      },
      {
        "name": "x5",
        "location": [
          49.767808618184276,
          24.129817485809326
        ],
        "type": "target"
      },
      {
        "name": "x6",
        "location": [
          49.76826597046791,
          24.124860763549805
        ],
        "type": "target"
      },
      {
        "name": "x7",
        "location": [
          49.76451001029057,
          24.128615856170654
        ],
        "type": "target"
      }
    ],

    // [
    //   {
    //     "name": "главный вход в лес",
    //     "location": [
    //       49.79792921100383,
    //       24.085679054260254
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "база Сфинкс",
    //     "location": [
    //       49.80712514385894,
    //       24.09230947494507
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "база Красных",
    //     "location": [
    //       49.800283757755885,
    //       24.096665382385254
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "база Желтых",
    //     "location": [
    //       49.80230580651794,
    //       24.098360538482666
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "база Синих",
    //     "location": [
    //       49.802513546469996,
    //       24.092845916748047
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "база Верхний Хошемин",
    //     "location": [
    //       49.80198727019354,
    //       24.09079670906067
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "база Морпехов",
    //     "location": [
    //       49.800616155133184,
    //       24.102351665496826
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "база Шторм",
    //     "location": [
    //       49.802070366828026,
    //       24.083662033081055
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "база Бобров",
    //     "location": [
    //       49.806737398832475,
    //       24.10072088241577
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "база Военных",
    //     "location": [
    //       49.81058701535934,
    //       24.0970516204834
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "родник",
    //     "location": [
    //       49.80357993085824,
    //       24.09076452255249
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "водопад",
    //     "location": [
    //       49.805117144939004,
    //       24.099197387695312
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "вход с Пасечной",
    //     "location": [
    //       49.809943126003816,
    //       24.080100059509277
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "вход с Мусорки",
    //     "location": [
    //       49.8052210089948,
    //       24.080893993377686
    //     ],
    //     "type": "target"
    //   },
    //   {
    //     "name": "вход с села",
    //     "location": [
    //       49.795325225978864,
    //       24.091601371765137
    //     ],
    //     "type": "target"
    //   }
    // ],

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
