myApp.controller("transDetailController", function ($scope, $http, $document, $routeParams) {
    $scope.addr = $routeParams.addr;
    $scope.block = [];

    $scope.getBlock = function () {
        //console.log("addr : " + $scope.addr);

        $http.get('/api/getTransactionDetails/' + $scope.addr)
            .then(function (response) {
               // console.log(response.data);
                $scope.block = response.data;
            }, function (err) {
                alert("Not Found!!");
                console.log(err);
            });
    }
    $scope.click = function () {
        $scope.blockId = $document[0].getElementById("tnum")
        $scope.linkName = $document[0].getElementById("alink")
        $scope.linkName.setAttribute("href", '/#/transDetail/' + $scope.blockId.value);

    }


    $scope.getBlock();
});
