var Web3 = require('web3');
var bodyParser = require("body-parser");
var serverConfig = require('./serverConfig')
var fs = require('fs');
//let home = process.env['HOME'];

// Url of Ethereum private network.
if (!serverConfig.ChainIpAddr) {
    console.log('\x1b[31m', '!!! ERROR !!! - No Ethereum Chain IP address defined.', '\x1b[0m');
} else {
    var privateNodeUrl = "http://" + serverConfig.ChainIpAddr + ":" + serverConfig.ChainPortNo;
    web3 = new Web3(new Web3.providers.HttpProvider(privateNodeUrl));

}

/**
 * 
 * @param {string} latestBlockNumberPath well qualified path for the file containing number of latest block @example './Database/LatestBlockkkk.txt'
 * @param {string} blockFilePath 
 * @returns {Promise} returns promise object with boolean value true if success else returns promise object with error.
 */
async function writeBlockToFile(latestBlockNumberPath,blockFilePath) {
    return new Promise(async (resolve, reject) => {
        try {
            var blocksArray = [];
            var n = web3.eth.blockNumber;
            await fs.readFile(latestBlockNumberPath, async function (err, latestUpdatedBlock) {
                for (var i = latestUpdatedBlock.toString('utf8'); i < n; i++) {
                    var block = web3.eth.getBlock(i, true);
                    if (block.transactions.length) {
                        blocksArray.push(block);
                    } else {
                        blocksArray.push(block);
                    }
                }
                await fs.writeFile(latestBlockNumberPath, n, async function (err) {
                    await fs.readFile(blockFilePath, async function (err, contents) {
                        var jsonObj = JSON.parse(contents);
                        var obj2 = blocksArray;
                        var obj3 = jsonObj.concat(obj2);
                        var strBlocks = JSON.stringify(obj3);
                        await fs.writeFile(blockFilePath, strBlocks, function (err) {
                            if (err) {
                                reject(err);
                            }
                        });
                        resolve(true);
                    });
                });

            });
        }
        catch (err) {
            reject(err);
        }
    })
}

// resolve path config

writeBlockToFile('/home/chirag/work/ethereum/Moon-develop/Moon-chain/Database/LatestBlock.txt','/home/chirag/work/ethereum/Moon-develop/Moon-chain/Database/Blocks.txt').then(console.log);
