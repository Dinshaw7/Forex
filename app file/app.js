var Web3 = require('web3');
var express = require('express');
var app= express();
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8000'));
var cors = require('cors');     
var bodyParser = require('body-parser');

var abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "getTxnData",
		"outputs": [
			{
				"internalType": "string",
				"name": "_userId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fromAccount",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_toAccount",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amountPaid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountDeducted",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_impliedRate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_marketRate",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fromAccount",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_toAccount",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amountPaid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountDeducted",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_impliedRate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_marketRate",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];



const transactionObject = {
  from: '0xa4ac698f93a7f99c8f594527f141fb73822d8782',
 // gas: 2000
 // value: 200
};


// creation of contract object
//var MyContract = new web3.eth.Contract(abi);


// initiate contract for an address
//var myContractInstance = MyContract.at("0xe54AD11931bD9404BD7F0ad5218780B76086C2F2");

var myContractInstance = new web3.eth.Contract(abi, "0xe54AD11931bD9404BD7F0ad5218780B76086C2F2");   //Forex
//var myContractInstance = new web3.eth.Contract(abi, "0x69bF4156eb89c2b4b68225c11cD8D13a85473B1D");     //SimpleBank

// call constant function
//var result = myContractInstance.methods.getAllExchanges().call( transactionObject, function(error, result){
//});
//var result = myContractInstance.balance.call();
//console.log(result) // '0x25434534534'

// send a transaction to a function

//myContractInstance.createUser('uid01', {value: 200, gas: 2000});

// short hand style
//web3.eth.contract(abi).at(address).myAwesomeMethod(...);

// create filter
/*
var myEvent = myContractInstance.userCreated({string: 'uid111'}, {fromBlock: 0, toBlock: 'latest'});
myEvent.watch(function(error, result){
  console.log(result);
});
// would get all past logs again.
var myResults = myEvent.get(function(error, logs){ console.log(result); });
// would stop and uninstall the filter
myEvent.stopWatching();
*/


myContractInstance.getPastEvents("allEvents", {
    fromBlock:0,
    toBlock: "latest"
}, function(error, events){ console.log("error:", error); }).then(function(events){
    console.log(events)
}); 
 


   /*
   {
       address: '0x8718986382264244252fc4abd0339eb8d5708727',
       topics: "0x12345678901234567890123456789012", "0x0000000000000000000000000000000000000000000000000000000000000005",
       data: "0x0000000000000000000000000000000000000000000000000000000000000001",
       ...
   }
   */




var server = app.listen(8181, (server) => console.log('Server Listening in port 8181'));


console.log(server.address());




