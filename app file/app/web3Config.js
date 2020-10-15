
//Ethereum backend connection implementation



var Web3 = require('web3');
var cors = require('cors');     
var bodyParser = require('body-parser');

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8777'));



var ForexBook_Contract_Addr = "0xB06284dA0D5ea4Af21867CfAE0E7Be58227De425";



var ForexBook_Contract_abi =[
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


var Exchange_Contract_abi = [
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




var obj_ForexBook = function(){
   
 return web3.eth.contract(ForexBook_Contract_abi).at(ForexBook_Contract_Addr);

}



var unlockAccount = function () {
    
   
 //console.log(web3.eth.accounts[0]);    
   
 //web3.personal.unlockAccount(web3.eth.accounts[0], "dinshaw");

web3.personal.unlockAccount("0x958c797007c5884dafd39bf962772aa983e20139", "seed");
}



var getGasLimit = function () {
   
 obj_ForexBook();
   
 unlockAccount();
    
return ({ from: "0x958c797007c5884dafd39bf962772aa983e20139", gas: web3.toHex(web3.eth.getBlock(0).gasLimit)});

}



module.exports = {
    
getGasLimit : getGasLimit,
   
obj_ForexBook : obj_ForexBook, 
  
web3 :web3

}
