pragma solidity >=0.5.0 <0.6.0;

import "./PokemonFactory.sol";

contract PokemonHelper is PokemonFactory {

  uint levelUpFee = 0.001 ether;

  event EvolvedPokemon(string previousName, string currentName);
  event LeveledUp(uint pokemonId, uint pokedexNum, string name);

  modifier onlyOwnerOf(uint _pokemonId) {
    require(msg.sender == pokemonToOwner[_pokemonId]);
    _;
  }

  modifier notOwnerOf(uint _pokemonId) {
    require(msg.sender != pokemonToOwner[_pokemonId]);
    _;
  }

  modifier aboveLevel(uint _level, uint _pokemonId) {
    require(pokemons[_pokemonId].level >= _level);
    _;
  }

  function setLevelUpFee(uint _fee) external onlyOwner {
    levelUpFee = _fee;
  }

  function evolvePokemon(uint _pokemonId) internal {
    string memory previousName = pokemons[_pokemonId].name;
    pokemons[_pokemonId].pokedexNum += 3;
    pokemons[_pokemonId].name = pokedexNumToName[pokemons[_pokemonId].pokedexNum];
    emit EvolvedPokemon(previousName, pokemons[_pokemonId].name);
  }

  function levelUp(uint _pokemonId) external onlyOwnerOf(_pokemonId){
    uint previousLevel = pokemons[_pokemonId].level;
    //require(msg.value == levelUpFee);
    pokemons[_pokemonId].level++;
    if (pokemons[_pokemonId].level >=5 && previousLevel <5 || pokemons[_pokemonId].level >=10 && previousLevel <10) {
      evolvePokemon(_pokemonId);
    }
    emit LeveledUp(_pokemonId, pokemons[_pokemonId].pokedexNum, pokemons[_pokemonId].name);
  }

  function changeNickname(uint _pokemonId, string calldata _newNickname) external aboveLevel(2, _pokemonId) onlyOwnerOf(_pokemonId) {
    pokemons[_pokemonId].nickname = _newNickname;
  }
   function changeName(uint _pokemonId, string calldata _newName) external {
    pokemons[_pokemonId].name = _newName;
  }

  function changePokedexNum(uint _pokemonId, uint _newPokedexNum) external {
    pokemons[_pokemonId].pokedexNum = _newPokedexNum;
  }

}