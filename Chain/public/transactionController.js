myApp.controller("transactionController", function ($scope, $document, $http) {
    $scope.click = function () {
        $scope.blockId = $document[0].getElementById("tnum")
        $scope.linkName = $document[0].getElementById("alink")
        $scope.linkName.setAttribute("href", '/#/transactionsList/' + $scope.blockId.value);

    }

    $scope.txDetails;
    //$scope.allBlocksFromChain = [];
    //$scope.allBlocksFromFile = [];
    //$scope.blockListModel;

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

   /* $scope.getAllBlocks = function () {
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
    } */

    /*$scope.checkIfContract = function(addr) {
        if(addr)
        {
          window.location.href = "#/contratDetail?addr="+addr;
        }
        console.log("passed",addr);
    }*/

    $scope.getAllTransactions = function () {
        //$scope.getAllBlocks();
        $http.get('/api/getAllTransactions/')
            .then(function (response) {
                console.log(response);
                $scope.txDetails = response.data;

            }, function (err) {
                alert('Some technical error...!!!');
                console.log(err);
            });
    }




});
