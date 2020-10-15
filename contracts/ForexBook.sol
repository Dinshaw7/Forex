 pragma solidity^0.5.0;
//pragma experimental ABIEncoderV2;

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/lifecycle/Pausable.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/math/SafeMath.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/ownership/Ownable.sol";
//import "https://github.com/willitscale/solidity-util/lib/Strings.sol";

import "./Exchange.sol";

contract ForexBook {

 // using SafeMath for uint256;
 // using Strings for *;

  //data structures & mappings

  string[] users;

  address[] public exchanges; // all payTo transactions go here
  /* struct txnData {
     address txId;
     bytes32 fromAccount; // from account td
     bytes32 toAccount;  // to account id
     uint256 amountPaid; // in receiving currency
     uint256 amountDeducted; // in source currency
     uint256 impliedRate;
     uint256 marketRate;
  } */

  mapping (string => uint256) public balances; // maintain balance for each account id

  struct accountStruct{
    string[] accounts;
  }

  mapping (string => string) accountType;

  mapping (string => accountStruct) userAccounts; // one to many mapping between userId & their accounts

  constructor() public {
  }

  // Events
  event userCreated(string);
  event accountGenerated(string, string, string);
  event depositFunds(string, string, uint256);
  event withdrawFunds(string, string, uint256);
  event paidInAnotherCurrency(string, string, string, uint256, uint256, uint256, uint256); // log attributes

  /*function getAccounts(string memory userId) public returns(string [] memory){
   return userAccounts[userId].accounts;
  }*/

  /* functions */
  // 1. create user
  /* generates user id takes user basic details
     random string generation could be done in UI
     do we need to store user basic details in contract?*/
  /* function createUser(string name, string addr, string country) public returns(string){
      public string id;
      id = name.toSlice().concat(addr.toSlice()).concat(country.toSlice());
      return id;
  } */
     // Anurag can generate this random string by web3 toHex, toHash method

     function createUser(string memory userId) public returns(bool){
         // require conditions if any
         users.push(userId);
         emit userCreated(userId);
         return true;

     }
  // 2. add account
  /* inputs: userId, currency
     create accountId
     update userAccounts mapping for user
     initializes account with balance*/
     function addAccount(string memory userId, string memory currency, string memory accountId) public returns(bool){
         // assuming accountId is already generated in UI
         //userAccounts[userId].accounts.push(accountId);
         // should require user id to have created
         balances[accountId] = 0;
         accountType[accountId] = currency;
         emit accountGenerated(userId, accountId, currency);
         return true;
     }
  // 3. Deposit
     function depoSit(string memory userId, string memory accountId, uint256 amount) public returns(bool){
         balances[accountId] = balances[accountId] + amount;
         emit depositFunds(userId, accountId, amount);
         return true;
     }
  // 4. Withdraw
     function withdraw(string memory userId, string memory accountId, uint256 amount) public returns(bool){
         uint256 bal = balances[accountId];
         require(bal >= amount, "Insuffiecient funds");
         balances[accountId] = balances[accountId] - amount;
         emit withdrawFunds(userId, accountId, amount);
         return true;
     }
  // 5. payTo
     // should userId also be part of transaction data?
     function payTo(string memory userId, string memory fromAccount, string memory toAccount, uint256 amountPaid, uint256 amountDeducted, uint256 impliedRate, uint256 marketRate)
     public payable returns(address) {
         // check any reuirements
         Exchange exchangeContract = new Exchange(userId, fromAccount, toAccount, amountPaid, amountDeducted, impliedRate, marketRate);
         exchanges.push(address(exchangeContract));
         emit paidInAnotherCurrency(userId, fromAccount, toAccount, amountPaid, amountDeducted, impliedRate, marketRate);
         return address(exchangeContract);
     }
  // 6. getDatabyUserId
    /* for this we get all exchanges / transactions and filter in using userID in the UI */
  // 7. getDatabytxnId
    /* essentially getAllExchanges() */
  // 8. getDatabyaccountId
    /* for this we get all exchanges / transactions and filter in using fromAccount & toAccount in the UI */
  // 9. getAllTransactions / payments / exchanges
     function getAllExchanges() public view returns(address[] memory) {
       return exchanges;
      }
} 
