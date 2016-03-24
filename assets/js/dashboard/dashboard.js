angular.module('weldingApp.dashboard', [])

  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/dashboard', {
        templateUrl: 'js/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      })
    }
  ])

  .controller('DashboardCtrl', ['$scope',
    function ($scope) {
    }
  ]);
