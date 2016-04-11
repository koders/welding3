angular.module('weldingApp.orders', [])

  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/orders', {
        templateUrl: 'js/orders/orders.html',
        controller: 'OrdersCtrl'
      })
    }
  ])

  .controller('OrdersCtrl', ['$scope', '$http', '$location', 'OrderService',
    function ($scope, $http, $location, OrderService) {
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

      $scope.editOrder = function(order){
        $location.url('/orders/' + order.id);
      };

      $scope.createOrder = function () {
        var orderPromise = OrderService.createOrder({data:JSON.stringify({})});
        orderPromise.then(
          function (payload) {
            $scope.editOrder(payload);
          },
          function (errorPayload) {
            console.error('failure creating order', errorPayload);
          });
      };

      // Load semantic UI
      setTimeout(function() {
        $('[data-content]').popup();
        $('.ui.dropdown').dropdown();
      });
    }
  ]);
