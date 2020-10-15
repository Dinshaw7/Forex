myApp.controller("transactionsListController", function ($scope, $http, $routeParams, $document) {
    $scope.id = $routeParams.id;
    $scope.transactionsList = [];

    $scope.getTransactionsFromBlock = function () {
        $http.get('/api/getTransactionsFromBlock/' + $scope.id)
            .then(function (response) {
                $scope.transactionsList = response.data;
               // console.log($scope.transactionsList);
            }, function (err) {
                alert("Some technical error...!!!");
                console.log(err);
            });

    }
    $scope.click = function () {
        $scope.blockId = $document[0].getElementById("tnum")
        $scope.linkName = $document[0].getElementById("alink")
        $scope.linkName.setAttribute("href", '/#/transactionsList/' + $scope.blockId.value);

    }

    $scope.getTransactionsFromBlock();
});


