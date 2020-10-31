pragma solidity >=0.5.0 <0.6.0;

import "./PokemonAttack.sol";
import "./erc721.sol";

contract PokemonOwnership is PokemonAttack, ERC721 {

  mapping (uint => address) pokemonApprovals;

  function balanceOf(address _owner) external view returns (uint256) {
    return ownerPokemonCount[_owner];
  }

  function ownerOf(uint256 _tokenId) external view returns (address) {
    return pokemonToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) public {
    ownerPokemonCount[_to]++;
    ownerPokemonCount[_from]--;
    pokemonToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
    require (pokemonToOwner[_tokenId] == msg.sender || pokemonApprovals[_tokenId] == msg.sender);
    _transfer(_from, _to, _tokenId);
  }

  function approve(address _approved, uint256 _tokenId) external payable onlyOwnerOf(_tokenId) {
    pokemonApprovals[_tokenId] = _approved;
    emit Approval(msg.sender, _approved, _tokenId);
  }
}
