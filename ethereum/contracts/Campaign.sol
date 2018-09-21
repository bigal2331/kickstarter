pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    //This doesn't create an instance of the Request a struct just defines the blue print of an object. 
    //it is the equivalent of a js class. Once define you can create instances of it.
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
        
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping( address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        assert (msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description : description,
            value : value,
            recipient : recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    
    function approveRequest(uint index) public {
        // storage because you want to manipulate the actual struct, not a copy
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;
        
    }

    function getSummary () public view returns(uint, uint, uint,uint, address){
        return(
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}