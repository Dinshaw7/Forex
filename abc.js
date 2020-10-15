const Web3 = require('web3')

const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/JNDH51WKZB3NBCUJ4PFHZYMNS35MQB3RUH#"));

async function createAccount(){
    var wallet = await web3.eth.accounts.create();
    console.log('Address:' + wallet.address);
    console.log('Private Key: ' + wallet.privateKey)
}

createAccount();
