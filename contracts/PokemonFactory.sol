pragma solidity >=0.5.0 <0.6.0;

import "./Ownable.sol";

contract PokemonFactory is Ownable{


    event NewPokemon(uint id, string name, string nickname, uint dna, uint pokedexNum, string stype);  
    uint randNonce = 0;
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits; 
    uint cooldownTime = 30 seconds;


    struct Pokemon {
        string name;
        string nickname;
        string stype;
        uint id;
        uint dna;
        uint pokedexNum;
        uint level;
        uint readyTime;
        uint health;
    }
    constructor() public {
        pokedexNumToName[1] = "bulbasaur";
        pokedexNumToName[2] = "charmander";
        pokedexNumToName[3] = "squirtle";
        pokemonNumToType[1] = "grass";
        pokemonNumToType[2] = "fire";
        pokemonNumToType[3] = "water";

        pokedexNumToName[4] = "ivysaur";
        pokedexNumToName[5] = "charmeleon";
        pokedexNumToName[6] = "wartortle";
        pokemonNumToType[4] = "grass";
        pokemonNumToType[5] = "fire";
        pokemonNumToType[6] = "water";

        pokedexNumToName[7] = "venusaur";
        pokedexNumToName[8] = "charizard";
        pokedexNumToName[9] = "blastoise";
        pokemonNumToType[7] = "grass";
        pokemonNumToType[8] = "fire";
        pokemonNumToType[9] = "water";
    }

    Pokemon[] public pokemons;

    mapping (uint => address) public pokemonToOwner;
    mapping (address => uint) ownerPokemonCount;
    mapping (uint => string) public pokedexNumToName;
    mapping (uint => string) public pokemonNumToType;

    function addPokemonToPokedex(uint pokedexNum, string memory name) internal{
        pokedexNumToName[pokedexNum] = name;
    }

    function _createPokemon(string memory _name, string memory _nickname, uint _dna, uint _pokedexNum, string memory _stype) public {
        uint idPoke = pokemons.push(Pokemon(_name, _nickname, _stype, 0, _dna, _pokedexNum, 1, uint(now), 100)) - 1;
        pokemonToOwner[idPoke] = msg.sender;
        ownerPokemonCount[msg.sender]++;
        pokemons[idPoke].id = idPoke;
        emit NewPokemon(idPoke, _name, _nickname, _dna, _pokedexNum, _stype);
    }

    function _generateRandomDna(string memory _str) private returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str, randNonce)));
        randNonce++;
        return rand % dnaModulus;
    }

    function randPokemonId(uint _modulus) internal returns(uint) {
        randNonce++;
        return uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % _modulus;
    } 

    function getPokemonsByOwner (address _owner) public returns (uint[] memory) {
        uint[] memory result = new uint[](ownerPokemonCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < pokemons.length; i++) {
            if (pokemonToOwner[i] == _owner) {
            result[counter] = i;
            counter++;
            }
        }   

        return result;
    }

    function createRandomPokemon(string memory _nickname) public {
        require(ownerPokemonCount[msg.sender] <=5);
        uint randPokedexNum = randPokemonId(3);
        string memory name = pokedexNumToName[randPokedexNum+1];
        string memory stype = pokemonNumToType[randPokedexNum+1];
        uint randDna = _generateRandomDna(_nickname);

        _createPokemon(name, _nickname, randDna, randPokedexNum + 1, stype); 
    }
}