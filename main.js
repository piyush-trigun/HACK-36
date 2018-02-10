Web3=require('web3');
web3 = new Web3( new Web3.providers.HttpProvider("http://localhost:8545/") );
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"text","type":"string"},{"name":"index","type":"uint256"},{"name":"upvotes","type":"uint256"},{"name":"downvotes","type":"uint256"},{"name":"totalvotes","type":"uint256"},{"name":"isImg","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getCurrentUser","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"text","type":"string"}],"name":"proposeImg","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"text","type":"string"}],"name":"propose","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pindex","type":"uint256"},{"name":"support","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"voted","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNoOfProposals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
ethvote = web3.eth.contract(abi).at('0xaee3571575d210e68c0aa9bf1da550b1eb923367');

// curUser = ethvote.getCurrentUser.call();
curUser = web3.eth.accounts[2];
console.log("user: " +  curUser);
var ind=parseInt(ethvote.getNoOfProposals.call())-1;

function addcard(chk)
{
	ind+=1;
	console.log(ind);
	var card=document.createElement("div");
	$(card).addClass("responsive").css({"float":"left","width":"21.5%","margin":"15px","box-shadow":"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}).appendTo("body");
	var card2=document.createElement("div");
	if(ind%2==0)
	{
		$(card2).addClass("gallary").css({"border-bottom":"2px solid #777","height":"250px","background-color":"#3ebcd6","color":"#fff","padding":"15px","text-align":"center"}).appendTo(card);	
	}
	else
	{
		$(card2).addClass("gallary").css({"border-bottom":"2px solid #777","height":"250px","background-color":"#d13038","color":"#fff","padding":"15px","text-align":"center"}).appendTo(card);
	}
	if(chk==1)
	{
		var text=document.createElement("h3");
		$(text).html(""+$("#proptext").val()).css({"word-wrap":"break-word","font-family":"'Raleway',sans-serif","font-weight":"550"}).appendTo(card2);
	}
	else if(chk==2)
	{
		var imagee=document.createElement("img");
		var imgpath=""+$("#propphoto").val();
		$(imagee).attr({"src":imgpath}).appendTo(card2);
		$(imagee).css({"width":"100%","height":"100%"});
	}

	var votearea=document.createElement("div");
	$(votearea).addClass("desc").attr({"index-data":""+ind}).css({"height":"40px"}).appendTo(card);

	var like=document.createElement("img");
	$(like).addClass("hotimg").attr("src","./assets/hot1.png").css({"height":"35px","width":"35px","cursor":"pointer","user-select":"none"}).appendTo(votearea);
	var dislike=document.createElement("img");
	$(dislike).addClass("notimg").attr("src","./assets/not2.png").css({"height":"35px","width":"35px","cursor":"pointer","user-select":"none"}).appendTo(votearea);
	$(like).css({"margin-left":"28%","margin-right":"15%"});
	//$(dislike).css({"margin-left":"60%"})

	var numbers=document.createElement("div");
	$(numbers).css({"height":"40px"}).appendTo(card);
	var _ups=document.createElement("h3");
	var _downs=document.createElement("h3");
	$(_ups).html("0").css({"font-family":"'Raleway',sans-serif","font-weight":"600","font-size":"30px","float":"left"}).appendTo(numbers);
	$(_downs).html("0").css({"font-family":"'Raleway',sans-serif","font-weight":"600","font-size":"30px"}).appendTo(numbers);
	$(_ups).css({"margin-left":"32%","margin-right":"20%"});
	var oldvote = parseInt(ethvote.voted.call(curUser,ind).c[0].toString()); 
		
		if(oldvote == 1) {
			console.log("already voted yes: " + ind);	
		} else if (oldvote == 2) {
			console.log("already voted no: " + ind);
		} else {
			console.log("can vote: " + ind);
		}
		if(oldvote==1 || oldvote==2)
        		{
        			$(like).css({"visibility":"hidden"});
        			$(dislike).css({"visibility":"hidden"});
        		}

	$(like).click(function(){
		console.log("Balance: " + web3.eth.getBalance(curUser));
		var pindex = parseInt($(this).parent().attr("index-data"));
		console.log(pindex);
        		ethvote.vote(pindex,1, {from:curUser, gas:3000000});
        		voteReward();
        		var oldvote = parseInt(ethvote.voted.call(curUser,ind).c[0].toString()); 
        		if(oldvote==1 || oldvote==2)
        		{
        			$(like).css({"visibility":"hidden"});
        			$(dislike).css({"visibility":"hidden"});
        		}
        		location.reload(true);
	});

	$(dislike).click(function(){
		var pindex = $(this).parent().attr("index-data");
        		console.log(pindex);
        		ethvote.vote(pindex,2, {from:curUser, gas:3000000});
        		voteReward();
        		var oldvote = parseInt(ethvote.voted.call(curUser,ind).c[0].toString()); 
        		if(oldvote==1 || oldvote==2)
        		{
        			$(like).css({"visibility":"hidden"});
        			$(dislike).css({"visibility":"hidden"});
        		}
        		location.reload(true);
	});
	//$(dislike).css({"margin-left":"60%"})
}

function proposalCharge()
{
	var admin = ethvote.admin.call();
	console.log("admin: " + admin);
	web3.eth.sendTransaction({from: curUser, to: admin, value: ind*1000+1000});
	alert((ind*1000+1000)+" weis deducted from your account! Thank You for submitting your proposal.")
}

function voteReward()
{
	var admin = ethvote.admin.call();
	console.log("admin: " + admin);
	var  bal = parseInt(web3.eth.getBalance(admin).c[0].toString());
	console.log("balance: " + bal);
	web3.eth.sendTransaction({from: admin, to: curUser, value:web3.toWei(0.000001*bal, "ether")});
	alert("You got  " + 0.000001*bal+ "  ether from admin for liking/disliking the proposal. cheers!!");
}

function createProposal() {
	text=$("#proptext").val();
	ethvote.propose(text, {from: curUser, gas: 3000000});
	proposalCharge();
	addcard(1);
}

function convertToHex()
{
	url=$("#propphoto").val(); 
const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  }));


toDataURL(url)
  .then(dataUrl => {
    console.log('RESULT:', dataUrl);
    ethvote.proposeImg(dataUrl,{from: curUser, gas:3000000 });
 addcard(2);
  });

}

function loadcards( str, ups, downs,indx,check)
{
	var card=document.createElement("div");
	$(card).addClass("responsive").css({"float":"left","width":"21.5%","margin":"15px","box-shadow":"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}).appendTo("body");
	var card2=document.createElement("div");
	if(indx%2==0)
	{
		$(card2).addClass("gallary").css({"border-bottom":"2px solid #777","height":"250px","background-color":"#3ebcd6","color":"#fff","padding":"15px","text-align":"center"}).appendTo(card);
	}
	else
	{
		$(card2).addClass("gallary").css({"border-bottom":"2px solid #777","height":"250px","background-color":"#d13038","color":"#fff","padding":"15px","text-align":"center"}).appendTo(card);
	}
	if(check==1)
	{
		var text=document.createElement("h3");
		$(text).html(""+str).css({"word-wrap":"break-word","font-family":"'Raleway',sans-serif","font-weight":"600"}).appendTo(card2);
	}
	else if(check==2)
	{
		var imagee=document.createElement("img");
		$(imagee).attr({"src":str}).appendTo(card2);
		$(imagee).css({"width":"100%","height":"100%"});
	}
	var votearea=document.createElement("div");
	$(votearea).attr({"index-data":""+indx}).addClass("desc").css({"height":"40px"}).appendTo(card);

	var like=document.createElement("img");
	$(like).addClass("hotimg").attr("src","./assets/hot1.png").css({"height":"35px","width":"35px","cursor":"pointer","user-select":"none"}).appendTo(votearea);
	var dislike=document.createElement("img");
	$(dislike).addClass("notimg").attr("src","./assets/not2.png").css({"height":"35px","width":"35px","cursor":"pointer","user-select":"none"}).appendTo(votearea);
	$(like).css({"margin-left":"28%","margin-right":"15%"});

	var oldvote = parseInt(ethvote.voted.call(curUser,indx).c[0].toString()); 
		
		if(oldvote == 1) {
			console.log("already voted yes: " + indx);	
		} else if (oldvote == 2) {
			console.log("already voted no: " + indx);
		} else {
			console.log("can vote: " + indx);
		}
		if(oldvote==1 || oldvote==2)
        		{
        			$(like).css({"visibility":"hidden"});
        			$(dislike).css({"visibility":"hidden"});
        		}
	//$(dislike).css({"margin-left":"60%"})
	var numbers=document.createElement("div");
	$(numbers).css({"height":"40px"}).appendTo(card);
	var _ups=document.createElement("h3");
	var _downs=document.createElement("h3");
	$(_ups).html(""+ups).css({"font-family":"'Raleway',sans-serif","font-weight":"600","font-size":"30px","float":"left"}).appendTo(numbers);
	$(_downs).html(""+downs).css({"font-family":"'Raleway',sans-serif","font-weight":"600","font-size":"30px"}).appendTo(numbers);
	$(_ups).css({"margin-left":"30%","margin-right":"20%"});
	$(like).click(function(){
		console.log("Balance: " + web3.eth.getBalance(curUser));
		var pindex = parseInt($(this).parent().attr("index-data"));
		console.log(pindex);
        		ethvote.vote(pindex,1, {from:curUser, gas:3000000});
        		voteReward();
        		var oldvote = parseInt(ethvote.voted.call(curUser,ind).c[0].toString()); 
        		if(oldvote==1 || oldvote==2)
        		{
        			$(like).css({"visibility":"hidden"});
        			$(dislike).css({"visibility":"hidden"});
        		}
        		location.reload(true);
	});

	$(dislike).click(function(){
		var pindex = $(this).parent().attr("index-data");
        		ethvote.vote(pindex,2,{from:curUser,gas:3000000});
        		console.log(pindex);
        		voteReward();
        		var oldvote = parseInt(ethvote.voted.call(curUser,ind).c[0].toString()); 
        		if(oldvote==1 || oldvote==2)
        		{
        			$(like).css({"visibility":"hidden"});
        			$(dislike).css({"visibility":"hidden"});
        		}
        		location.reload(true);
	});
}
function cardloader()
{
	for (var j=0; j <parseInt(ethvote.getNoOfProposals.call()); j++) {
		var prop=ethvote.proposals.call(j)[0].toString();
		var upvts=ethvote.proposals.call(j)[2].c[0].toString();
		var dwnvts=ethvote.proposals.call(j)[3].c[0].toString();
		var check=ethvote.proposals.call(j)[5].c[0];
		loadcards(prop,upvts,dwnvts,j,check);
	}
	
}
