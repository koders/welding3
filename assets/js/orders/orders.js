angular.module('weldingApp.orders', [])

  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/orders', {
        templateUrl: 'js/orders/orders.html',
        controller: 'OrderCtrl'
      })
    }
  ])

  .controller('OrderCtrl', ['$scope', '$http',
    function ($scope, $http) {
      $http.get('api/orders?sort=id%20desc').success(function (data) {
        $scope.items = data;
        for (var i = 0; i < $scope.items.length; i++) {
          $scope.items[i].data = angular.fromJson($scope.items[i].data);
          $scope.items[i].data.ocnr = parseInt($scope.items[i].data.ocnr);
        }
      });

      $scope.selected = [];

      $scope.getStatusClass = function (status) {
        if (status == 0) {
          return 'test';
        } else {
          return 'test' + status;
        }
      };

      $scope.getStatus = function (status) {
        if (status == 0) {
          return {
            title: 'New',
            icon: 'large blue add circle icon'
          }
        }
        if (status == 1) {
          return {
            title: 'In Production',
            icon: 'large yellow in cart icon'
          }
        }
        if (status == 2) {
          return {
            title: 'Completed',
            icon: 'large green checkmark icon'
          };
        }
        if (status == 3) {
          return {
            title: 'Deleted',
            icon: 'large black remove icon'
          };
        }
      };

    }
  ]);
