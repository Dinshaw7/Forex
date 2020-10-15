pragma solidity^0.5.0;
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/lifecycle/Pausable.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/math/SafeMath.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/ownership/Ownable.sol";
//import "https://github.com/willitscale/solidity-util/lib/Strings.sol";
contract Exchange {
//  using SafeMath for uint256;
//  using Strings for *;
   struct TxnData {
   //address txId;
     string userId;
     string fromAccount; // from account td
     string toAccount;  // to account id
     uint256 amountPaid; // in receiving currency
     uint256 amountDeducted; // in source currency
     uint256 impliedRate;
     uint256 marketRate;
  }
  TxnData transaction; // you may call it exchange
  constructor(string memory _userId, string memory _fromAccount, string memory _toAccount, uint256 _amountPaid, uint256 _amountDeducted, uint256 _impliedRate, uint256 _marketRate)
  public {
        transaction.userId = _userId;
        transaction.fromAccount = _fromAccount;
        transaction.toAccount = _toAccount;
        transaction.amountPaid = _amountPaid;
        transaction.amountDeducted = _amountDeducted;
        transaction.impliedRate = _impliedRate;
        transaction.marketRate = _marketRate;
    }
  function getTxnData() view public returns (
        string memory _userId, string memory _fromAccount, string memory _toAccount,
        uint256 _amountPaid, uint256 _amountDeducted, uint256 _impliedRate,
        uint256 _marketRate) {
        return (transaction.userId, transaction.fromAccount, transaction.toAccount,
                transaction.amountPaid, transaction.amountDeducted, transaction.impliedRate,
                transaction.marketRate);
    }
}






