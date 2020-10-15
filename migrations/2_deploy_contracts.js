var ForexBook = artifacts.require("./ForexBook.sol");

var Exchange = artifacts.require("./Exchange.sol");


module.exports = function(deployer) {
  deployer.deploy(ForexBook, { value: 30000000000000000000 });

};

module.exports = function(deployer) {
  deployer.deploy(Exchange, { value: 30000000000000000000 });

};





