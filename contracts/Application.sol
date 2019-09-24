pragma solidity 0.5.9;


contract Application {

    string public message; // store the message

    constructor () public {
        message = "";
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory _msg) public {
        // comparing the strings  and if the string is empty it will revert the transaction
        if (uint(keccak256(abi.encodePacked(_msg))) == uint(keccak256(abi.encodePacked("")))) {
            return revert();
        }
        message = _msg;
    }






}
