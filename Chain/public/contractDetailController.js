myApp.controller("contractDetailController", function ($scope, $http, $document, $routeParams) {
    $scope.txId = $routeParams.txId;
    $scope.contract = [];

    $scope.getContract = function () {
        //console.log("addr : " + $scope.addr);

        $http.get('/api/getContractDetails/' + $scope.txId)
            .then(function (response) {
                console.log(response.data);
                $scope.contract = response.data;
            }, function (err) {
                alert("Not Found!!");
                console.log(err);
            });
    }
    
    // no point unless you have txId
    $scope.click = function () {
        $scope.contractAddress = $document[0].getElementById("cont_addr")
        $scope.linkName = $document[0].getElementById("alink")
        $scope.linkName.setAttribute("href", '/#/contractDetail/' + $scope.contractAddress.value);

    } 


    $scope.getContract();
});