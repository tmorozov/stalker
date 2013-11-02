var all = {};

exports.all = all;

exports.addToken = function (key, name) {
  var type = (name === 'пилот') ? 'npc' : 'me'

  all[key] = {
    name: name,
    type: type
  };
}