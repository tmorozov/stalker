var msgElement = document.querySelector(options.location.msgSelector);

function msg(text) {
  msgElement.innerText = text;
}

msg('Js init');

if (navigator.geolocation) {
  var timeoutVal = 10 * 1000 * 1000;
//  var timeoutVal = 0; //infinity - timeout on heroku?
  navigator.geolocation.getCurrentPosition(
    displayPosition, 
    displayError, {
      enableHighAccuracy: true,
      timeout: timeoutVal,
      maximumAge: 60 * 1000 * 1000
    }
  );
} else {
  msg("Geolocation is not supported by this browser");
}

function displayPosition(position) {
  msg("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
}

function displayError(error) {
  var errors = { 
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  msg("Error: " + errors[error.code]);
}