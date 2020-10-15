myApp.controller("queryTransactionController", function ($scope, $document) {
    $scope.click = function () {
        $scope.blockId = $document[0].getElementById("tnum")
        $scope.linkName = $document[0].getElementById("alink")
        $scope.linkName.setAttribute("href", '/#/transDetail/' + $scope.blockId.value);

    }

});
