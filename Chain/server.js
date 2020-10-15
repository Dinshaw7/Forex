//Initiallising node modules
var express = require("express");
var Web3 = require('web3');
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs');
app.locals.blocks = [];

//var web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.1.214:8777'));


//var forexBookAddress = "0x3D549Dbf6847d9278643b2c219bCb48592f10B0e";      // chirag's contract address

var forexBookAddress = "0x55121EEf4430F1d50fc32c2088fb153BAAEc76CD";        // dinshaw's contract address


var forexBookAbi = [{"constant":false,"inputs":[{"internalType":"string","name":"masterAccountId","type":"string"},{"internalType":"address","name":"accountId","type":"address"}],"name":"addAccount","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"exchanges","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"users","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllExchanges","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"masterAccountId","type":"string"}],"name":"createUser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"masterAccountId","type":"string"},{"internalType":"address","name":"fromAccount","type":"address"},{"internalType":"address","name":"toAccount","type":"address"},{"internalType":"string","name":"fromCurrency","type":"string"},{"internalType":"string","name":"toCurrency","type":"string"},{"internalType":"uint256","name":"amountSent","type":"uint256"},{"internalType":"uint256","name":"amountReceived","type":"uint256"},{"internalType":"uint256","name":"impliedRate","type":"uint256"},{"internalType":"uint256","name":"marketRate","type":"uint256"},{"internalType":"uint256","name":"fees","type":"uint256"}],"name":"payTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"masterAccountId","type":"string"}],"name":"userCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"userId","type":"string"},{"indexed":false,"internalType":"address","name":"accountId","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"userId","type":"string"},{"indexed":false,"internalType":"address","name":"accountId","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"masterAccountId","type":"string"},{"indexed":false,"internalType":"address","name":"fromAccount","type":"address"},{"indexed":false,"internalType":"address","name":"toAccount","type":"address"},{"indexed":false,"internalType":"string","name":"fromCurrency","type":"string"},{"indexed":false,"internalType":"string","name":"toCurrency","type":"string"},{"indexed":false,"internalType":"uint256","name":"amountSent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"impliedRate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"marketRate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fees","type":"uint256"}],"name":"paidInAnotherCurrency","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"contractDeployed","type":"address"}],"name":"exchangeMade","type":"event"}];


var exchangeAbi = [{"constant":true,"inputs":[],"name":"getTxnData","outputs":[{"internalType":"string","name":"_masterAccountId","type":"string"},{"internalType":"address","name":"_fromAccount","type":"address"},{"internalType":"address","name":"_toAccount","type":"address"},{"internalType":"string","name":"_fromCurrency","type":"string"},{"internalType":"string","name":"_toCurrency","type":"string"},{"internalType":"uint256","name":"_amountSent","type":"uint256"},{"internalType":"uint256","name":"_amountReceived","type":"uint256"},{"internalType":"uint256","name":"_impliedRate","type":"uint256"},{"internalType":"uint256","name":"_marketRate","type":"uint256"},{"internalType":"uint256","name":"_fees","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_masterAccountId","type":"string"},{"internalType":"address","name":"_fromAccount","type":"address"},{"internalType":"address","name":"_toAccount","type":"address"},{"internalType":"string","name":"_fromCurrency","type":"string"},{"internalType":"string","name":"_toCurrency","type":"string"},{"internalType":"uint256","name":"_amountSent","type":"uint256"},{"internalType":"uint256","name":"_amountReceived","type":"uint256"},{"internalType":"uint256","name":"_impliedRate","type":"uint256"},{"internalType":"uint256","name":"_marketRate","type":"uint256"},{"internalType":"uint256","name":"_fees","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];


// Body Parser Middleware
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});


//////////////////////////////////////////// DAPP ///////////////////////////////////////
// Read the config.
var serverConfig = require('./serverConfig')

// Url of Ethereum private network.
if (!serverConfig.ChainIpAddr) {
    /*
    '\x1b[31m' - Red Color
    '\x1b[32m' - Green Color
    '\x1b[0m' - Reset color
    */
    console.log('\x1b[31m', '!!! ERROR !!! - No Ethereum Chain IP address defined.', '\x1b[0m');
} else {
    var privateNodeUrl = "http://" + serverConfig.ChainIpAddr + ":" + serverConfig.ChainPortNo;
    web3 = new Web3(new Web3.providers.HttpProvider(privateNodeUrl));

    var server = app.listen(process.env.PORT || serverConfig.WebPortNo, function () {
        var port = server.address().port;
        console.info('\x1b[32m', "App running on - localhost:" + port, '\x1b[0m');
    });
}


// ----------------------------------------------------- API ----------------------------------------------------- //

app.get("/api/getChainOverview", function (req, res) {
    // console.log('inside api service method : getlatestBlock()');
    var chainOverview = {};
    var gasPrice, hashRate;


    web3.eth.getGasPrice((err, price) => {
        chainOverview['gasPrice'] = price;
        web3.eth.getHashrate((err, rate) => {
            chainOverview['hashRate'] = rate;
            chainOverview['lastBlock'] = web3.eth.blockNumber;

            // console.log('chain overview---')
            // console.log(chainOverview);
            res.send(chainOverview);
        });
    });
});


app.get("/api/getAllAccountDetails", function (req, res) {
    // console.log('inside api service method : getAllAccountDetails()');
    // Account List
    var accounts = web3.eth.accounts;
    var accountDetails = accounts.map(function (item) {
        return {
            address: item,
            balance: web3.fromWei(web3.eth.getBalance(item))
        }
    });

    res.send(accountDetails);
});


/*app.get("/api/getAllBlocks", function (req, res) {
    // console.log('inside api service method : getAllBlocks()');

    var n = web3.eth.blockNumber;
    // web3.eth.getBlockNumber(function(data){n=data});
    // console.log("Block number : " + n);

    //var blocks = [];
    for (var i = n; i > n - 50; i--) {
        // console.log("Block number : " + i);
        var block = web3.eth.getBlock(i, true);
        if (block.transactions.length) {
            app.locals.blocks.push(block);
        } else {
            app.locals.blocks.push(block);
        }
    }

    var strBlocks = JSON.stringify(app.locals.blocks);
    console.log("Writing blocks to txt file." + strBlocks);
    fs.writeFile('./Database/Blocks.txt', strBlocks, function (err) {
        if (err) {
            console.log("ERROR writing blocks to txt file...!!!");
            res.send(err);
        }
    });

    console.log("Returning blocks--------o ");
    res.send(app.locals.blocks);
}); */

app.get("/api/getAllBlocksFromFile", function (req, res) {
    // console.log('inside api service method : getAllBlocksFromFile()');

    fs.readFile('./Database/Blocks.txt', 'utf8', function (err, contents) {
        if (err) {
            console.log("ERROR reading txt file!!!");
            res.send(err);
        } else {
            // console.log('--------- String Content from TXT file ---------');
            // console.log(contents);
            var jsonObj = JSON.parse(contents);
            // console.log('--------- JSON Content from TXT file ---------');
            // console.log(jsonObj);

            // send data to front end
            // console.log("Returning blocks from TXT File --------");
            res.send(jsonObj);
        }
    });
});

app.get("/api/getTransactionsFromBlock/:id", function (req, res) {
    // console.log('inside api service method : getTransactionsFromBlock() : param : ' + req.params.id);
    var id = req.params.id;
    var txs = [];
    var tx;

    var n = web3.eth.getBlockTransactionCount(id)
    for (var i = 0; i < n; i++) {
        tx = web3.eth.getTransactionFromBlock(id, i);
        tx["value"] = web3.fromWei(tx["value"]);
        txs.push(tx);
    }

    res.send(txs);
});


/*app.get("/api/getAllTransactions", function (req, res) {

    // get all blocks from  blocks global var / file dump
    // get all transactions from each block id using above method call
    // show from, to, block id and value

    var txs = [];
    var tx;
    // console.log("some block:" + app.locals.blocks[0].number);
    app.locals.blocks.map(function (item) {
        if (item.transactions.length) {
            var n = web3.eth.getBlockTransactionCount(item.number)
            for (var i = 0; i < n; i++) {
                tx = web3.eth.getTransactionFromBlock(item.number, i);
                tx["value"] = web3.fromWei(tx["value"]);
                txs.push(tx);
                // console.log(tx);
            }

        }
    });

    res.send(txs);
});*/

app.get("/api/getAllTransactions", function (req, res) {
    // get all blocks from  blocks global var / file dump
    // get all transactions from each block id using above method call
    // show from, to, block id and value
    var txs = [];
    var BlockArray = [];
    var tx;
    fs.readFile('./Database/Blocks.txt', 'utf8', function (err, contents) {
        if (err) {
            console.log("ERROR reading txt file!!!");
            res.send(err);
        } else {
            var jsonObj = JSON.parse(contents);
            BlockArray = jsonObj;

        }
        BlockArray.map(function (item) {
            if (item.transactions.length) {
                var n = web3.eth.getBlockTransactionCount(item.number)
                for (var i = 0; i < n; i++) {
                    tx = web3.eth.getTransactionFromBlock(item.number, i);

                    var isAContract;

                    if (tx.to == null) {
                        isAContract = false;
                    }
                    else {
                        isAContract = true;
                    }
                    tx["isContract"] = isAContract;
                    txs.push(tx);
                }
            }
        });
    res.send(txs); 
    });
});


app.get("/api/getPaymentsForUser/:userId", async function (req, res) {
    var userId = req.params.userId;
    console.log(userId);
    var ForexBook = await web3.eth.contract(forexBookAbi).at(forexBookAddress);

    var payments = [];
    var result = await ForexBook.getAllExchanges.call();

    for await (const item of result) {
        var exchange = await web3.eth.contract(exchangeAbi).at(item);
        var txData = await exchange.getTxnData.call();
        if (txData[0] == userId) {
            var payment = {
                userId: txData[0],
                fromAccount: txData[1],
                toAccount: txData[2],
                fromCurrency: txData[3],
                toCurrency: txData[4],
                amountSent: txData[5].toNumber() / 100000,
                amountReceived: txData[6].toNumber() / 100000,
                impliedRate: txData[7].toNumber() / 100000,
                marketRate: txData[8].toNumber() / 100000,
                fees: txData[9].toNumber() / 100000
            };
            payments.push(payment);
        }

    };

    res.send(payments);
});


app.get("/api/getPaymentsForAccount/:accNum", async function (req, res) {
    var accountId = req.params.accNum;
    var ForexBook = await web3.eth.contract(forexBookAbi).at(forexBookAddress);

    var payments = [];
    var result = await ForexBook.getAllExchanges.call();

    for await (const item of result) {
        var exchange = await web3.eth.contract(exchangeAbi).at(item);
        var txData = await exchange.getTxnData.call();
        if (txData[1] == accountId || txData[2] == accountId) {
            var payment = {
                userId: txData[0],
                fromAccount: txData[1],
                toAccount: txData[2],
                fromCurrency: txData[3],
                toCurrency: txData[4],
                amountSent: txData[5].toNumber() / 100000,
                amountReceived: txData[6].toNumber() / 100000,
                impliedRate: txData[7].toNumber() / 100000,
                marketRate: txData[8].toNumber() / 100000,
                fees: txData[9].toNumber() / 100000
            };
            payments.push(payment);
        }

    };

    res.send(payments);
});



app.get("/api/getAllPayments", async (req, res) => {

    var ForexBook = await web3.eth.contract(forexBookAbi).at(forexBookAddress);

    var payments = [];
    var result = await ForexBook.getAllExchanges.call();

    for await (const item of result) {
        var exchange = await web3.eth.contract(exchangeAbi).at(item);
        var txData = await exchange.getTxnData.call();
        var payment = {
            userId: txData[0],
            fromAccount: txData[1],
            toAccount: txData[2],
            fromCurrency: txData[3],
            toCurrency: txData[4],
            amountSent: txData[5].toNumber() / 100000,
            amountReceived: txData[6].toNumber() / 100000,
            impliedRate: txData[7].toNumber() / 100000,
            marketRate: txData[8].toNumber() / 100000,
            fees: txData[9].toNumber() / 100000
        };
        payments.push(payment);
    };

    res.send(payments);
});

app.get("/api/getTransactionDetails/:id", function (req, res) {
    var id = req.params.id;
    var txData = web3.eth.getTransactionReceipt(id);

    console.log(txData);
    var logs = txData.logs;
    console.log("log object");
    console.log(logs);
    for(const item of logs){
        var topic = item.topics[0];
        console.log("topic: " + topic);
        if(topic == "0x6c266022d98427da88464399d212927d5c4a1ecb555cee32781d5c9e06555097")
        {
            topic = "user created";
        }
        else if(topic == "0xc7916c4e4fd421ec713fc8cf940bb2fc97141f59b28122562b09265b8342c240")
        {
            topic = "forex payment";
        }
        else if(topic == "0xe9cf8f2124250265c760c409f9c13deffc1b43b2e57ebabb85506c4e2c9b05a3")
        {
            topic = "exchange contract";
        }
        else
        {
            topic = "unknown";
        }
        var data = item.data;
        console.log("data: " + data);
        //decode topic
        item.topics[0] = topic;
    };
     console.log(txData.contractAddress);
    /*if(!txData.contractAddress)
    {
        txData.contractAddress = 'no contract created';
    }*/
    // decoding logs from tx receipt can be done here in advanced before sending txData object which becomes block in controller code
    res.send(txData);

    // show : transaction hash, block number, contractAddress, logs
});


app.get("/api/getBlock/:addr", function (req, res) {
    // console.log('inside api service method : getBlock() : param : ' + req.params.addr);
    var block = web3.eth.getBlock(req.params.addr);
    res.send(block);
});

/*app.get("/api/getContractDetail/:contractId", function (req, res) {

    
    
});*/


/* app.get("/api/getAllContractsss", function (req, res) {
    var contracts = [];
    var tx;
    // console.log("some block:" + app.locals.blocks[0].number);
    app.locals.blocks.map(function (item) {
        if (item.transactions.length) {
            var n = web3.eth.getBlockTransactionCount(item.number)
            for (var i = 0; i < n; i++) {
                tx = web3.eth.getTransactionFromBlock(item.number, i);
                tx["value"] = web3.fromWei(tx["value"]);
                { if(tx.to == null)
                  hash = tx.hash;
                  var contract = web3.eth.getTransactionReceipt(hash).contractAddress
                     var contract_obj = [];

                     contract_obj = {
                         contract_address : web3.eth.getTransactionReceipt(hash).contractAddress,
                         contract_creator : tx.from,
                         contract_gasUsed : tx.gas,
                         contract_value : tx.value
                     };
                }
                contracts.push(contract_obj);
            }
        }
    });
    res.send(contracts);
}); */


/* 
app.get("/api/getAllContracts", function (req, res) {
    var contracts = [];
    var BlockArray = [];
    var tx;
    fs.readFile('./Database/Blocks.txt', 'utf8', async function (err, contents) {
        if (err) {
            console.log("ERROR reading txt file!!!");
            res.send(err);
        } else {
            var jsonObj = JSON.parse(contents);
            BlockArray = jsonObj;
        }
        BlockArray.map(function (item) {
            if (item.transactions.length) {
                var n = web3.eth.getBlockTransactionCount(item.number)
                for (var i = 0; i < n; i++) {
                    tx = web3.eth.getTransactionFromBlock(item.number, i);
                 //   tx["value"] = web3.fromWei(tx["value"]);
                    if (tx.to == null) {
                        hash = tx.hash;
                        var contract_obj = [];
                        contract_obj = {
                            contract_address: web3.eth.getTransactionReceipt(hash).contractAddress,
                            contract_creator: tx.from,
                            contract_gasUsed: tx.gas,
                            contract_value: web3.eth.getBalance(web3.eth.getTransactionReceipt(hash).contractAddress)
                        };
                        contracts.push(contract_obj);
                    }
                    else if(web3.eth.getCode(tx.to) != "0x")
                    {
                        hash = tx.hash;
                        var contract_obj = [];
                        contract_obj = {
                            contract_address: tx.to,
                            contract_creator: "unknown", // figures out later
                            contract_gasUsed: tx.gas,
                            contract_value: web3.eth.getBalance(tx.to)
                        };
                        contracts.push(contract_obj);
                    }
                }
            }
        });
        res.send(contracts);
    });
});

 */

app.get("/api/getAllContracts", async function abc (req, res) {
    return new Promise(async (resolve, reject) => {
     //   try {
            var contracts = [];
            var contracts2 = [];
            var BlockArray = [];
            var ContractArray = [];
            var tx;
            var contracts3 = [];
            var flag = 0;
            fs.readFile('./Database/Blocks.txt', 'utf8', async function (err, contents) {
                if (err) {
                    console.log("ERROR reading txt file!!!");
                    reject(err);
                }
                else {
                    var jsonObj = JSON.parse(contents);
                    BlockArray = jsonObj;
                }
                var flag = 0;
                await BlockArray.map(async function (item) {
                    if (item.transactions.length) {
                        var n = web3.eth.getBlockTransactionCount(item.number);
                        for (var i = 0; i < n; i++) {
                            tx = web3.eth.getTransactionFromBlock(item.number, i);
                            hash = tx.hash;
                            if (tx.to == null) {
                                contract_obj = {
                                    contract_address: web3.eth.getTransactionReceipt(hash).contractAddress,
                                    contract_creator: tx.from,
                                    contract_gasUsed: tx.gas,
                                    contract_value: web3.eth.getBalance(web3.eth.getTransactionReceipt(hash).contractAddress)
                                };
                                contracts.push(contract_obj);
                            }
                            else {
                                await fs.readFile('./Database/ContractAddr_Creator_Mapping.txt', 'utf8', async function (err, contents) {
                                    if (err) {
                                        console.log("ERROR reading txt file!!!");
                                        reject(err);
                                    } else {
                                        var jsonObj = JSON.parse(contents);
                                        ContractArray = jsonObj;
                                    }
                                    await ContractArray.map(async function (item) {
                                        if (tx["to"] == item.contract_address) {
                                            contract_obj = {
                                                contract_address: tx.to,
                                                contract_creator: item.contract_creator,
                                                contract_gasUsed: tx.gas,
                                                contract_value: web3.eth.getBalance(tx.to)
                                            };
                                            contracts2.push(contract_obj);
                                        }
                                    });
                                    if (contracts2.length == 16) {    // 16 is the number of json objects written in ContractAddr_Creator_Mapping.txt file.
                                        //  16 needs to be resolved
                                        contracts3 = contracts.concat(contracts2);
                                        res.send(contracts3)
                                    }
                                });
                            }
                        }
                    }
                });
               // resolve(res.send(contracts3));
            });
    //    }
       /*  catch (err) {
            reject(err);
        } */
    });
})






app.get("/api/getContractDetails/:txId", function (req, res) {  
    var hash = req.params.txId;
    var txReceipt = web3.eth.getTransactionReceipt(hash);
    var contract_obj = [];
    var tx = web3.eth.getTransactionFromBlock(txReceipt.blockNumber);
    contract_obj = {
       // contract_address: web3.eth.getTransactionReceipt(hash).contractAddress,
        contract_address: web3.eth.getTransactionReceipt(hash).to,
        contract_creator: tx.from,
        contract_gasUsed: tx.gas,
        contract_value: tx.value
    };
    res.send(contract_obj);
});
