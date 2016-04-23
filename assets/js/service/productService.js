weldingApp.factory('ProductService', function ($http, $q) {
  return {
    getProducts: function () {
      var defer = $q.defer();
      $http.get('/api/products').success(function (resp) {
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
