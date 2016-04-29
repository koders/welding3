angular.module('weldingApp.order', ['ngAnimate'])

  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/orders/:orderId', {
        templateUrl: 'js/orders/order.html',
        controller: 'OrderCtrl'
      })
    }
  ])

  .controller('OrderCtrl', ['$scope', '$http', '$location', '$routeParams', 'OrderService', 'ProductService', 'TermService', 'PersonService',
    'CompanyService', '$timeout',
    function ($scope, $http, $location, $routeParams, OrderService, ProductService, TermService, PersonService, CompanyService, $timeout) {

      $scope.initSemanticUI = function(){
        // Load semantic UI
        setTimeout(function() {
          $('.ui.dropdown').dropdown();
        });
      };

      $scope.backToOrders = function(){
        $location.path('orders')
      };

      // fallback
      $scope.order = {data: {}};

      // Get Order
      var orderPromise = OrderService.getOrder($routeParams.orderId);
      orderPromise.then(
        function (payload) {
          $scope.order = payload;
          $scope.order.data = JSON.parse($scope.order.data);
          $scope.order.data.ocnr = parseInt($scope.order.data.ocnr);
          $scope.initSemanticUI();
        },
        function (errorPayload) {
          console.error('failure reading order', errorPayload);
          $scope.initSemanticUI();
        }
      );

      $scope.addProduct = function(){
        if(!$scope.order.data.p) {
          $scope.order.data.p = [];
        }
        $scope.order.data.p.push({});
        // $timeout(function(){$('.dropdown').dropdown()}, 0, false);
        $scope.initSemanticUI();
      };

      $scope.removeProduct = function(index){
        $scope.order.data.p.splice(index, 1);
      };

      // Get Products
      var productPromise = ProductService.getProducts();
      productPromise.then(
        function (payload) {
          $scope.products = payload;
        },
        function (errorPayload) {
          console.error('failure reading products', errorPayload);
        }
      );

      // Get Companies
      var companyPromise = CompanyService.getCompanies();
      companyPromise.then(
        function (payload) {
          $scope.companies = payload;
        },
        function (errorPayload) {
          console.error('failure reading companies', errorPayload);
        }
      );

      // Get Terms
      var termPromise = TermService.getTerms();
      termPromise.then(
        function (payload) {
          $scope.terms = payload;
        },
        function (errorPayload) {
          console.error('failure reading terms', errorPayload);
        }
      );

      // Get Persons
      var personPromise = PersonService.getPersons();
      personPromise.then(
        function (payload) {
          $scope.persons = payload;
        },
        function (errorPayload) {
          console.error('failure reading persons', errorPayload);
        }
      );

      $scope.updateProduct = function(product, productModel){
        if(!productModel) {
          for(var i = 0; i < $scope.products.length; i++) {
            var p = $scope.products[i];
            if(product.pno == p.productNumber) {
              product.desc = p.description;
              return;
            }
          }
        } else {
          product.pno = productModel.productNumber;
          product.desc = productModel.description;
        }
      };

      $scope.calculateProductTotal = function(products){
        var total = 0;
        if(!products) {
          return 0;
        }
        products.forEach(function(product){
          var current = product.price * product.pcs;
          if(!isNaN(current)) {
            total += current;
          }
        });
        return total;
      };

      $scope.selectCompany = function(company) {
        $scope.order.data.company = company.name;
      };

      $scope.selectDeliveryAddress = function(company) {
        $scope.order.data.daddres = company.address;
      };

      $scope.submitOrder = function(){
        console.log($scope.order);
      };
    }
  ]);
