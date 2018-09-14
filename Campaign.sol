pragma solidity ^0.4.17;
contract Campaign {
    //This doesn't create an instance of the Request a struct just defines the blue print of an object. 
    //it is the equivalent of a js class. Once define you can create instances of it.
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping( address => bool) public approvers;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        assert (msg.value > minimumContribution);
        approvers[msg.sender] = true;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description : description,
            value : value,
            recipient : recipient,
            complete: false
        });
        
        requests.push(newRequest);
    }
    
    
}