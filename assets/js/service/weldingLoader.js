weldingApp.factory('WeldingLoader', function ($http, $q) {
  var timeout = null;
  return {
    start: function () {
      $('.loader').attr('data-loading', 1);
    },
    stop: function () {
      clearTimeout(timeout);
      timeout = setTimeout(function(){
        $('.loader').attr('data-loading', 0);
      }, 1000);
    }
  }
});
