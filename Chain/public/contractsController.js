myApp.controller("contractsController", function ($scope, $document, $http) {
  
  /*  $scope.click = function () {
        $scope.contract_addr = $document[0].getElementById("cont_addr")
        $scope.linkName = $document[0].getElementById("alink")
        $scope.linkName.setAttribute("href", '/#/contracts/' + $scope.contract_addr.value);

    }*/

    $scope.contr_Details;
 
    /*var createBlockListModel = function (blockList) {
        $scope.blockListModel = blockList.map(function (block) {
            return {
                number: block.number,
                hash: block.hash,
                miner: block.miner,
                timestamp: block.timestamp,
                txCount: block.transactions.length,
                size: block.size,
            }
        });

    }*/

    /*$scope.getAllBlocks = function () {
        // $http.post('/api/getAllAccountDetails/', $scope.selectedOption)
        if ($scope.allBlocksFromChain.length <= 0) {
            $http.get('/api/getAllBlocks/')
                .then(function (response) {
                    // console.log(response);
                    $scope.allBlocksFromChain = response.data;
                    createBlockListModel($scope.allBlocksFromChain);
                    // $location.path('/home');
                }, function (err) {
                    alert('Some technical error...!!!');
                    console.log(err);
                });
        }
        else {
            createBlockListModel($scope.allBlocksFromChain);
        }
    }*/


    /*$scope.getAllTransactions = function () {
        $scope.getAllBlocks();
        $http.get('/api/getAllTransactions/')
            .then(function (response) {
                $scope.txDetails = response.data;
            }, function (err) {
                alert('Some technical error...!!!');
                console.log(err);
            });
    }*/

    $scope.getAllContracts = function () {
        //$scope.getAllTransactions();
        $http.get('/api/getAllContracts/')
            .then(function (response) {
                $scope.contr_Details = response.data;
            }, function (err) {
                alert('Some technical error...!!!');
                console.log(err);
            });
    }


   
});
