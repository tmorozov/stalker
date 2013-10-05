app.service('Locations', function(Geolocation) {
  this.me = {
    name: 'Я',
    location: [49.8622, 23.9171],
    type: 'me'
  };

  this.npcs = [{
    name: 'Доктор',
    location: [49.862155,23.916207],
    type: 'npc'
  }, {
    name: 'Барыга',
    location: [49.864416,23.921962],
    type: 'npc'
  }, {
    name: 'Бармен',
    location: [49.860313,23.925817],
    type: 'npc'
  }];

  this.targets = [{
    name: '2b2',
    location: [49.86498,23.916439],
    type: 'target'
  }, {
    name: '6i4',
    location: [49.863714,23.919054],
    type: 'target'
  }];

});
