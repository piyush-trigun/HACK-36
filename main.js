Web3=require('web3');
web3 = new Web3( new Web3.providers.HttpProvider("http://localhost:8545/") );
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"text","type":"string"},{"name":"index","type":"uint256"},{"name":"upvotes","type":"uint256"},{"name":"downvotes","type":"uint256"},{"name":"totalvotes","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"text","type":"string"}],"name":"propose","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pindex","type":"uint256"},{"name":"support","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"voted","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNoOfProposals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
ethvote = web3.eth.contract(abi).at('0x0cbc4ca85beef37836225706327194289f53fc1c');


var ind=parseInt(ethvote.getNoOfProposals.call())-1;

function addcard()
{
	ind+=1;
	console.log(ind);
	var card=document.createElement("div");
	$(card).addClass("responsive").css({"float":"left","width":"21.5%","margin":"15px","box-shadow":"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}).appendTo("body");
	var card2=document.createElement("div");
	if(ind%2==0)
	{
		$(card2).addClass("gallary").css({"border-bottom":"2px solid #ccc","height":"250px","background-color":"#3ebcd6","color":"#fff","padding":"15px","text-align":"center"}).appendTo(card);	
	}
	else
	{
		$(card2).addClass("gallary").css({"border-bottom":"2px solid #ccc","height":"250px","background-color":"#d13038","color":"#fff","padding":"15px","text-align":"center"}).appendTo(card);
	}
	var text=document.createElement("h3");
	$(text).html(""+$("#proptext").val()).css({"word-wrap":"break-word","font-family":"'Raleway',sans-serif","font-weight":"600"}).appendTo(card2);
	var votearea=document.createElement("div");
	$(votearea).addClass("desc").attr({"index-data":""+ind}).css({"height":"40px"}).appendTo(card);

	var like=document.createElement("img");
	$(like).addClass("hotimg").attr("src","hot1.png").css({"height":"35px","width":"35px","cursor":"pointer","user-select":"none"}).appendTo(votearea);
	var dislike=document.createElement("img");
	$(dislike).addClass("notimg").attr("src","not2.png").css({"height":"35px","width":"35px","cursor":"pointer","user-select":"none"}).appendTo(votearea);
	$(like).css({"margin-left":"30%","margin-right":"15%"});
	//$(dislike).css({"margin-left":"60%"})

	var numbers=document.createElement("div");
	$(numbers).css({"height":"40px"}).appendTo(card);
	var _ups=document.createElement("h3");
	var _downs=document.createElement("h3");
	$(_ups).html("0").css({"font-family":"'Raleway',sans-serif","font-weight":"600","font-size":"30px","float":"left"}).appendTo(numbers);
	$(_downs).html("0").css({"font-family":"'Raleway',sans-serif","font-weight":"600","font-size":"30px"}).appendTo(numbers);
	$(_ups).css({"margin-left":"30%","margin-right":"22%"});

	$(like).click(function(){
		console.log("Balance: " + web3.eth.getBalance(web3.eth.accounts[0]));
		var pindex = parseInt($(this).parent().attr("index-data"));
		console.log(pindex);
        		ethvote.vote(pindex,1, {from:web3.eth.accounts[1], gas:3000000});
        		location.reload(true);
	});

	$(dislike).click(function(){
		var pindex = $(this).parent().attr("index-data");
        		console.log(pindex);
        		ethvote.vote(pindex,2, {from:web3.eth.accounts[1], gas:3000000});
        		location.reload(true);
	});
	//$(dislike).css({"margin-left":"60%"})
}
function createProposal() {
	text=$("#proptext").val();
	ethvote.propose(text, {from: web3.eth.accounts[1], gas: 300000});
	addcard();
}
function loadcards( str, ups, downs,indx)
{
	var card=document.createElement("div");
	$(card).addClass("responsive").css({"float":"left","width":"21.5%","margin":"15px","box-shadow":"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}).appendTo("body");
	var card2=document.createElement("div");
	if(indx%2==0)
	{
		$(card2).addClass("gallary").css({"border-bottom":"2px solid #ccc","height":"250px","background-color":"#3ebcd6","color":"#fff","padding":"15px","text-align":"center"}).appendTo(card);
	}
	else
	{
		$(card2).addClass("gallary").css({"border-bottom":"2px solid #ccc","height":"250px","background-color":"#d13038","color":"#fff","padding":"15px","text-align":"center"}).appendTo(card);
	}
	var text=document.createElement("h3");
	$(text).html(""+str).css({"word-wrap":"break-word","font-family":"'Raleway',sans-serif","font-weight":"600"}).appendTo(card2);
	var votearea=document.createElement("div");
	$(votearea).attr({"index-data":""+indx}).addClass("desc").css({"height":"40px"}).appendTo(card);

	var like=document.createElement("img");
	$(like).addClass("hotimg").attr("src","hot1.png").css({"height":"35px","width":"35px","cursor":"pointer","user-select":"none"}).appendTo(votearea);
	var dislike=document.createElement("img");
	$(dislike).addClass("notimg").attr("src","not2.png").css({"height":"35px","width":"35px","cursor":"pointer","user-select":"none"}).appendTo(votearea);
	$(like).css({"margin-left":"30%","margin-right":"15%"});
	//$(dislike).css({"margin-left":"60%"})
	var numbers=document.createElement("div");
	$(numbers).css({"height":"40px"}).appendTo(card);
	var _ups=document.createElement("h3");
	var _downs=document.createElement("h3");
	$(_ups).html(""+ups).css({"font-family":"'Raleway',sans-serif","font-weight":"600","font-size":"30px","float":"left"}).appendTo(numbers);
	$(_downs).html(""+downs).css({"font-family":"'Raleway',sans-serif","font-weight":"600","font-size":"30px"}).appendTo(numbers);
	$(_ups).css({"margin-left":"30%","margin-right":"22%"});
	$(like).click(function(){
		console.log("Balance: " + web3.eth.getBalance(web3.eth.accounts[0]));
		var pindex = parseInt($(this).parent().attr("index-data"));
		console.log(pindex);
        		ethvote.vote(pindex,1, {from:web3.eth.accounts[1], gas:3000000});
        		location.reload(true);
	});

	$(dislike).click(function(){
		var pindex = $(this).parent().attr("index-data");
        		ethvote.vote(pindex,2,{from:web3.eth.accounts[1],gas:3000000});
        		console.log(pindex);
        		location.reload(true);
	});
}
function cardloader()
{
	for (var j=0; j <parseInt(ethvote.getNoOfProposals.call()); j++) {
		var prop=ethvote.proposals.call(j)[0].toString();
		var upvts=ethvote.proposals.call(j)[2].c[0].toString();
		var dwnvts=ethvote.proposals.call(j)[3].c[0].toString();
		loadcards(prop,upvts,dwnvts,j);
	}
	
}