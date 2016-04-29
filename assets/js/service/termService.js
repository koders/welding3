weldingApp.factory('TermService', function ($http, $q) {
  return {
    getTerms: function () {
      var defer = $q.defer();
      $http.get('/api/terms').success(function (resp) {
        defer.resolve(resp);
      }).error(function (err) {
        defer.reject(err);
      });
      return defer.promise;
    },
  //   getOrder: function (id) {
  //     var defer = $q.defer();
  //     $http.get('/api/orders/' + id).success(function (resp) {
  //       defer.resolve(resp);
  //     }).error(function (err) {
  //       defer.reject(err);
  //     });
  //     return defer.promise;
  //   },
  //   addOrder: function (order) {
  //     var defer = $q.defer();
  //     $http.post('/api/orders', order).success(function (resp) {
  //       defer.resolve(resp);
  //     }).error(function (err) {
  //       defer.reject(err);
  //     });
  //     return defer.promise;
  //   },
  //   removeOrder: function (order) {
  //     var defer = $q.defer();
  //     $http.post('/api/removeOrder', order).success(function (resp) {
  //       defer.resolve(resp);
  //     }).error(function (err) {
  //       defer.reject(err);
  //     });
  //     return defer.promise;
  //   }
  }
});
