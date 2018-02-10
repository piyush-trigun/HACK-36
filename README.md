# HOT or NOT


> An Ethereum based decentralised application where a particular issue or idea gets promoted globally.
> **Proposers pay (with dynamic value 'charges' to initiate proposals), voters get paid (with dynamic value 'reward' to usher in voters)**.

A DApp where a user can add any issue or propose some idea/view in the form of text or small sized images which will be stored on the blockchain network (forever)!
People can react to the proposals or issues by upvoting / downvoting it.
This platform can be used to arrange elections in which we can upvote our favourite view or idea.
The ideas or proposal getting more votes will be trending or appearing at top respectively.

## Motivation
* Free and fair elections where the leader pays and you get paid!
* Raising public issues without government intervention or censor!
* Advertising yourself and/or your ideas.

## Screenshots
![alt text](https://github.com/armag-pro/hot-or-not-dapp/blob/master/screenshots/screenshot1.png)
![alt text](https://github.com/armag-pro/hot-or-not-dapp/blob/master/screenshots/screenshot2.png)
![alt text](https://github.com/armag-pro/hot-or-not-dapp/blob/master/screenshots/screenshot3.png)

## Languages Used
* [JavaScript](https://www.javascript.com/) / [JQuery](https://jquery.com/)
* [Solidity](https://solidity.readthedocs.io/en/develop/)
* [Node.js](https://nodejs.org/)
* [HTML](https://html.com/) / [CSS](https://www.w3.org/Style/CSS/Overview.en.html) / [Bootstrap](https://getbootstrap.com/)

## Built With
* [Remix](remix.ethereum.org) online IDE
* [Metamask](https://metamask.io/)(Browser Extension)
* [npm](https://www.npmjs.com/) packages ([ganache-cli](https://github.com/trufflesuite/ganache-cli), [testrpc](https://www.npmjs.com/package/ethereumjs-testrpc), [web3](https://github.com/ethereum/web3.js/), [solc](https://github.com/ethereum/solc-js)

## Deployment

You may use Metamask or testrpc (or Mist browser) to deploy a test network. Using `testrpc` provides a quick way to play with 10 test accounts with 100 ethers each.

`Cards.sol` is the smart-contract. It is compiled with the `solc` compiler.

The sol is linked with the javascript using the `web3.js` library. Run `node connect.js` and replace the abi and contract address in `main.js`.

Open `index.html` in your browser.

Change `web3.eth.accounts[0]` to `web3.eth.accounts[1]` in `main.js` to interact as a different user. (You have 10 test users). 

## Authors

* **Tuhin Subhra Patra** - *Backend* - [armag-pro](https://github.com/armag-pro)
* **Bavishi Milan** - *Frontend* - [jarvis-dev](https://github.com/jarvis-dev)
* **Jugta Ram** - *Backend* - [jugtaram](https://github.com/jugtaram)
* **Piyush Trigun** - *Frontend* - [piyush-trigun](https://github.com/piyush-trigun)

See also the list of [contributors](https://github.com/armag-pro/hot-or-not-dapp/contributors) who participated in this project.

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [MNNIT Workspace](https://github.com/mnnit-workspace)
* [khalibartan](https://github.com/khalibartan)
