angular.module('weldingApp.order', [])

  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/orders/:orderNo', {
        templateUrl: 'js/orders/order.html',
        controller: 'OrderCtrl'
      })
    }
  ])

  .controller('OrderCtrl', ['$scope', '$http', '$location',
    function ($scope, $http, $location) {
      $scope.backToOrders = function(){
        $location.path('orders')
      };
    }
  ]);
