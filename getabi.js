fs = require('fs');
 Web3 = require('web3');
 web3 = new Web3( new Web3.providers.HttpProvider("http://localhost:8545/") );
 console.log("Connected to Blockchain !!");
 code = fs.readFileSync("Cards.sol").toString();
 solc = require('solc');
 compiledCode = solc.compile( code );
 abi = compiledCode.contracts[":Cards"].interface;
