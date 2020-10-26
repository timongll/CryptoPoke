const CryptoPoke = artifacts.require("./CryptoPoke.sol");

module.exports = function (deployer) {
  deployer.deploy(CryptoPoke);
};
