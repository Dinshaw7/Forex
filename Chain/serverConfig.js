// Start private network
// geth --identity "NodeName" --networkid 888 --rpc --rpcport "8545" --rpccorsdomain "*" --rpcaddr "a.b.c.d" --datadir "./chaindata/" --port "30330" --nodiscover --rpcapi "db,eth,net,web3,personal"
// 8545 - rpc port of private chain
// --rpcaddr "a.b.c.d" --> IP address of the system running private ethereum chain. Required to enable another computer to connect to its private chain
// --rpccorsdomain "*" --> Allow all the system to connect to this node.

// CentOS config
/* 
const config = {
    ChainPortNo: 9181,
    ChainIpAddr: "34.207.205.64", // IP address of the system running private ethereum chain
    WebPortNo: 8872
};
 */


// dinshaw's private node config 
const config = {
    ChainPortNo: 8777,
    ChainIpAddr: "0.0.0.0", // IP address of the system running private ethereum chain
    WebPortNo: 8462
};

module.exports = config
