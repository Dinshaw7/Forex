// public/core.js
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
  //     $locationProvider.html5Mode({
  //        enabled: true,
  //        requireBase: false
  // });
  $httpProvider.interceptors.push('LoadingInterceptor');

  $locationProvider.hashPrefix('');

  $routeProvider.
    when('/dashboard', {
      templateUrl: 'dashboard.html', controller: 'dashboardController'
    }).
    when('/accounts', {
      templateUrl: 'home.html', controller: 'homeController'
    }).
    when('/blockList', {
      templateUrl: 'blockList.html', controller: 'blockListController'
    }).
    when('/transactions', {
      templateUrl: 'transactions.html', controller: 'transactionController'
    }).
    when('/queryTransactions', {
      templateUrl: 'queryTransactions.html', controller: 'queryTransactionController'
    }).
    when('/allTransactions', {
      templateUrl: 'alltransactions.html', controller: 'allTransactionController'
    }).
    when('/block/:addr', {
      templateUrl: 'block.html', controller: 'blockController'
    }).
    when('/transDetail/:addr', {
      templateUrl: 'transDetail.html', controller: 'transDetailController'
    }).
    when('/transactionsList/:id', {
      templateUrl: 'transactionsList.html', controller: 'transactionsListController'
    }).
    when('/payments', {
      templateUrl: 'payments.html', controller: 'paymentController'
    }).
    when('/accountPaymentsList/:accNum', {
      templateUrl: 'accountPaymentList.html', controller: 'accountPaymentListController'
    }).
    when('/userPaymentsList/:userId', {
      templateUrl: 'userPaymentList.html', controller: 'userPaymentListController'
    }).
    when('/contracts', {
      templateUrl: 'contracts.html', controller: 'contractsController'
    }).
    when('/contractDetail/:txId', {
      templateUrl: 'contractDetail.html', controller: 'contractDetailController'
    }). 
    otherwise({
      redirectTo: '/dashboard'
    });

}]);
