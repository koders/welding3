'use strict';

var weldingApp = angular.module('weldingApp', [
  'ngRoute',
  //'ngMaterial',
  //'mdDataTable',
  //'lumx',
  'ngAnimate',
  //'angular-loading-bar',
  'weldingApp.dashboard',
  'weldingApp.orders',
]);

weldingApp.controller('MainCtrl', ['$scope', 'OrderService', '$location', function ($scope, OrderService, $location) {

  // Menu items
  $scope.menuItems = [
    {
      link: '',
      title: 'Dashboard',
      icon: 'action:ic_dashboard_24px' // we have to use Google's naming convention for the IDs of the SVGs in the spritesheet
    },
    {
      link: '',
      title: 'Offers',
      icon: 'social:ic_group_24px'
    },
    {
      link: '',
      title: 'Orders',
      icon: 'communication:ic_message_24px'
    },
    {
      link: '',
      title: 'Invoices',
      icon: 'communication:ic_message_24px'
    }
  ];
  $scope.adminMenu = [
    {
      link: '',
      title: 'Trash',
      icon: 'action:ic_delete_24px'
    },
    {
      link: 'showListBottomSheet($event)',
      title: 'Settings',
      icon: 'action:ic_settings_24px'
    }
  ];

  $scope.orderOptions = [
    {
      icon: 'edit',
      title: 'Edit order data'
    },
    {
      icon: 'edit',
      title: 'Edit production data'
    },
    {
      icon: 'print',
      title: 'Print form 1'
    },
    {
      icon: 'print',
      title: 'Print form 2'
    },
    {
      icon: 'print',
      title: 'Print form 3'
    }
  ];

  $scope.selectedMenuItem = 'Dashboard';

  $scope.selectMenuItem = function (title) {
    $scope.selectedMenuItem = title;
    $location.url(title.toLowerCase());
  };

  $scope.orders = [];
  $scope.getOrders = function () {
    var promise = OrderService.getOrders();
    promise.then(
      function (payload) {
        $scope.orders = payload;
        $scope.orders.forEach(function (order) {
          order.data = angular.fromJson(order.data);
        });
      },
      function (errorPayload) {
        $log.error('failure loading orders', errorPayload);
      });
  };

  $scope.getOrders();

}]);

weldingApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      redirectTo: '/dashboard'
    });

    $routeProvider.otherwise({
      redirectTo: '/404'
    });

    $routeProvider.when('/404', {
      templateUrl: 'js/404.html',
    });
  }
]);
