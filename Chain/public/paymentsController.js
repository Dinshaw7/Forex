myApp.controller("paymentsController", function ($scope, $http, $routeParams, $document) {
    $scope.id = $routeParams.id;
    $scope.paymentDetails = [];

    $scope.getUserPayments = function () {
        $scope.userId = $document[0].getElementById("uId")
        $scope.linkName = $document[0].getElementById("alink")
        $scope.linkName.setAttribute("href", '/#/PaymentByUser/' + $scope.userId.value);

    }

    $scope.getAccountPayments = function () {
        $scope.accountId = $document[0].getElementById("accNum")
        $scope.linkName = $document[0].getElementById("alink")
        $scope.linkName.setAttribute("href", '/#/PaymentByAccount/' + $scope.accountId.value);

    }

 //   $scope.getUserPayments = function () {
    

    $scope.getAllPayments = function () {
        $http.get('/api/getAllPayments/')
            .then(function (response) {
                console.log(response);
                $scope.paymentDetails = response.data;
            }, function (err) {
                alert('Some technical error...!!!');
                console.log(err);
            });

    }



  

    
    $scope.getAccountPayments = function () {
        $http.get('/api/getPaymentsForAccount/' + $scope.accountId)
            .then(function (response) {
                console.log(response);
                $scope.paymentDetails = response.data;
            }, function (err) {
                alert('Some technical error...!!!');
                console.log(err);
            });

    }
  
  //  $scope.getUserPayments();
  //  $scope.getAccountPayments();
  
});
