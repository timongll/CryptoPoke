const CryptoPoke = artifacts.require("CryptoPoke");
const pokemonNames = ["Pokemon 1", "Pokemon 2"];
contract("CryptoPoke", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await CryptoPoke.new();
    });
    it("should be able to create a new zombie", async () => {
        const result = await contractInstance.createRandomPokemon(pokemonNames[0], {from: alice});
        assert.equal(result.receipt.status, true);
        assert.equal(result.logs[0].args.nickname,pokemonNames[0]);
})
})
