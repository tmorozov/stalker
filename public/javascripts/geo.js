var app = app || {
  module: {}
};

app.module['geo'] = (function (app) {
  var currentPosition;
  var watchID;

  function setLocation(position) {
    currentPosition = position;
  }

  function init() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition( function(position) {
        setLocation(position);
        //alert(position.coords.latitude+','+position.coords.longitude);
      });

      watchID = navigator.geolocation.watchPosition(function(position) {
        setLocation(position);
      });
      console.log('geo init complete');
    } else {
      console.log('no geo');
    }
  }

  function getPosition() {
    return currentPosition;
  }

  return {
    init: init,
    getPosition: getPosition
  };
})(app);

