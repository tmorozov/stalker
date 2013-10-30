app.factory('Locations', function($rootScope, Geolocation) {

  var locations = {
    me: {
      name: 'Я',
      location: [49.8622, 23.9171],
      type: 'me'
    },

    center: {
      name: 'Центр',
      location: [49.8622, 23.9171],
      type: 'center'
    },

    npcs: [{
      name: 'Мертвяк',
      location: [49.86209461993709, 23.91571283340454],
      type: 'npc'
    }],

    targets: [{
      "name": "A",
      "location": [49.86033789233539, 23.916399478912354],
      "type": "target"
    }, {
      "name": "B",
      "location": [49.86057823580848, 23.9188215136528],
      "type": "target"
    }, {
      "name": "C",
      "location": [49.861973587603934, 23.91914337873459],
      "type": "target"
    }, {
      "name": "D",
      "location": [49.86392562924272, 23.919376730918884],
      "type": "target"
    }, {
      "name": "E",
      "location": [49.864499642423276, 23.91714781522751],
      "type": "target"
    }]
  };

  $rootScope.$watch(Geolocation.positionValue, function(position, oldPosition) {
    if (position && position.valid /*&& position.coords.accuracy < 30*/) {
      locations.me.location = [position.coords.latitude, position.coords.longitude];
    }
  }, true);

  return {
    me: function() {
      return locations.me;
    },
    center: locations.center,
    npcs: locations.npcs,
    targets: locations.targets
  };
});
