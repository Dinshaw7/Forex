myApp.controller("userPaymentListController", function ($scope, $http, $document, $routeParams) {
    $scope.userId = $routeParams.userId;
    $scope.userPayments = [];

    $scope.getUserPayments = function () {
        //console.log("addr : " + $scope.addr);

        $http.get('/api/getPaymentsForUser/' + $scope.userId)
            .then(function (response) {
                console.log(response.data);
                $scope.userPayments = response.data;
            }, function (err) {
                alert("Not Found!!");
                console.log(err);
            });
    }
    /*$scope.click = function () {
        $scope.blockId = $document[0].getElementById("tnum")
        $scope.linkName = $document[0].getElementById("alink")
        $scope.linkName.setAttribute("href", '/#/transDetail/' + $scope.blockId.value);

    }*/

    $scope.clickAcc = function () {
        $scope.accNum = $document[0].getElementById("accnum")
        $scope.linkName = $document[0].getElementById("acclink")
        $scope.linkName.setAttribute("href", '/#/accountPaymentsList/' + $scope.accNum.value);

    }

    $scope.clickUser = function () {
        $scope.userId = $document[0].getElementById("uid")
        $scope.linkName = $document[0].getElementById("userlink")
        $scope.linkName.setAttribute("href", '/#/userPaymentsList/' + $scope.userId.value);

    }


    $scope.getUserPayments();
});