/*
    index where all the features called and server initialized..
*/

var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');




var getAllTransactions = require('./app/getAllTransactions');

var web3Config = require('./app/web3Config');



var app = express();


app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json()); 




//app.use('/api', getAllTransactions);

app.use(function(req, res, next) 
{
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





app.use(function(req, res, next) 
{
    res.header("Access-Control-Allow-Origin", "*");
   
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();

});



var server = app.listen(8222, (server) => console.log('Server Listening in port 8222'));


console.log(server.address());

