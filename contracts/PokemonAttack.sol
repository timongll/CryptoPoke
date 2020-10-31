pragma solidity >=0.5.0 <0.6.0;

import "./PokemonHelper.sol";

contract PokemonAttack is PokemonHelper {
    uint damage = 20;

event EnemyPokemonDamaged(string name, string enemyName, uint damageTaken);  
event PokemonDeath(string name, string enemyName);  

  function calculateDamage(uint _pokemonId, uint _targetId) public returns (uint){
    Pokemon storage pokemon = pokemons[_pokemonId];
    Pokemon storage enemyPokemon = pokemons[_targetId];
    if(keccak256(bytes(pokemon.stype)) == keccak256(bytes(enemyPokemon.stype))||
    keccak256(bytes(pokemon.stype)) == keccak256(bytes("grass")) && 
    keccak256(bytes(enemyPokemon.stype)) == keccak256(bytes("fire")) ||
    keccak256(bytes(pokemon.stype)) == keccak256(bytes("fire")) && 
    keccak256(bytes(enemyPokemon.stype)) == keccak256(bytes("water")) ||
    keccak256(bytes(pokemon.stype)) == keccak256(bytes("water")) && 
    keccak256(bytes(enemyPokemon.stype)) == keccak256(bytes("grass"))){
        return damage / 2;
    } else {
        return damage * 2;
    }
  }

  function _triggerCooldown(Pokemon storage _pokemon) internal {
    _pokemon.readyTime = uint32(now + cooldownTime);
  }

  function _isReady(Pokemon storage _pokemon) internal view returns (bool) {
    return (_pokemon.readyTime <= now);
  }

  function attack(uint _pokemonId, uint _targetId) external onlyOwnerOf(_pokemonId) notOwnerOf(_targetId){
    Pokemon storage pokemon = pokemons[_pokemonId];
    Pokemon storage enemyPokemon = pokemons[_targetId];
    require(_isReady(pokemon));
    uint calculatedDamage = calculateDamage(_pokemonId, _targetId);
    if(calculatedDamage >= enemyPokemon.health) {
      enemyPokemon.health = 0;
      uint previousLevel = pokemon.level;
      pokemon.level++;
      if (pokemon.level >=5 && previousLevel <5 || pokemon.level >=10 && previousLevel <10) {
      evolvePokemon(_pokemonId);
      }
      emit PokemonDeath(pokemon.name, enemyPokemon.name);
      ownerPokemonCount[pokemonToOwner[_targetId]] --;
      delete pokemonToOwner[_targetId];
      delete pokemons[_targetId];
    } else {
      enemyPokemon.health -= calculatedDamage;
    }
    emit EnemyPokemonDamaged(pokemon.name, enemyPokemon.name, calculatedDamage);
    _triggerCooldown(pokemon);

  }


}
