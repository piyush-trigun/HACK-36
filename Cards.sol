pragma solidity ^0.4.18;

contract Cards {
	
	uint noOfProposals = 0;
	
	mapping(address => mapping(uint => uint)) public voted;

	struct Proposal {
		string text;
		uint index;
		uint upvotes;
		uint downvotes;
		uint totalvotes;
	}

	address public admin;

	Proposal[] public proposals;

	function Cards() public {
		admin = msg.sender;
		for (uint i = 0; i < proposals.length; i++) {
			proposals[i].totalvotes = 0;
			proposals[i].upvotes = 0;
			proposals[i].downvotes = 0;
		}
	}

	function getNoOfProposals() public constant returns(uint) {
		return noOfProposals;
	}

	
	function vote(uint pindex, uint support) public {
		if(voted[msg.sender][pindex] == 1 || voted[msg.sender][pindex] == 2) return;
		voted[msg.sender][pindex] = support;
		proposals[pindex].totalvotes += 1;
		if( support == 1 ) proposals[pindex].upvotes += 1;
		else proposals[pindex].downvotes += 1;
	}

	function propose(string text) public {
		proposals.push(Proposal({text: text, index: proposals.length-1,upvotes:0,downvotes:0,totalvotes:0}));
		noOfProposals = proposals.length;
	}

}
