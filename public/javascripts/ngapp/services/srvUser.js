app.service('User', function() {
  this.user = {
    name: "",
    pwd: "",
    active: false,
    token: null
  };
});