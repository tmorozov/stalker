var msgElement = document.querySelector(options.location.msgSelector);

function msg(text) {
  msgElement.innerText = text;
}

msg('Js init');

if (navigator.geolocation) {
  var watchId = navigator.geolocation.watchPosition(
    displayPosition,
    displayError, { 
      enableHighAccuracy: true, 
      maximumAge: 60000, // 1 min
      timeout: 30000 // 30 sec
    }
  );
} else {
  msg("Geolocation is not supported by this browser");
}

function displayPosition(position) {
  displayPosition.counter++;
  msg("Latitude: " + position.coords.latitude + 
    ", Longitude: " + position.coords.longitude +
    ", accuracy:" + position.coords.accuracy +
    ", counter:" + displayPosition.counter +
    ", timestamp: " + new Date(position.timestamp));
}

displayPosition['counter'] = 0;

function displayError(error) {
  var errors = { 
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  msg("Error: " + errors[error.code]);
}