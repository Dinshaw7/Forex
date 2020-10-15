myApp.controller("paymentController", function ($scope, $http, $document) {

    $scope.clickAcc = function () {
        $scope.accNum = $document[0].getElementById("accnum")
        $scope.linkName = $document[0].getElementById("acclink")
        $scope.linkName.setAttribute("href", '/#/accountPaymentsList/' + $scope.accNum.value);

    }

    $scope.clickUser = function () {
        $scope.userId = $document[0].getElementById("uid")
	console.log($scope.userId.value)
        $scope.linkName = $document[0].getElementById("userlink")
        $scope.linkName.setAttribute("href", '/#/userPaymentsList/' + $scope.userId.value);

    }

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

   /* $scope.getUserPayments = function () {
        $http.get('/api/getPaymentsForUser/' + $scope.userId)
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
*/


});
