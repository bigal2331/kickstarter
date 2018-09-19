import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //on the browser and running metamask
  web3 = new Web3(window.web3.currentProvider);
} else {
  //on the server or not running metamask

  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/b16b09e1bfe240cda1e1ae98198e8813"
  );

  web3 = new Web3(provider);
}

export default web3;
