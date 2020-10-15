/* view property details */

var express = require('express')

var router = express.Router();

var web3Config = require('./web3Config');




router.post('/getAllTransactions', async function (req, res, next) {
     console.log("View all Txn Details");

     var exchange_address_arr = [];
     var obj = [];
     var a;

     exchange_address_arr = obj_ForexBook.getAllTransactions.call();
     
       exchange_address_arr.forEach(function(item)
      {   Exchange_Contract_Addr = item;  
          obj_Exchange = web3.eth.contract(Exchange_Contract_abi).at(Exchange_Contract_Addr);
          var exchange_data = obj_Exchange.getTxnData.call();
     

     a = {
           "User Id": exchange_data[0],
	   "From Account": exchange_data[1],
	   "To Account": exchange_data[2],
	   "Amount Paid": exchange_data[3],
	   "Amount Deducted": exchange_data[4],
	   "Implied Rate": exchange_data[5],
	   "Market Rate": exchange_data[6],
         }

     obj.push(a);

     console.log(obj);
      });


});


module.exports = router




