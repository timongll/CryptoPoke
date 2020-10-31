import React, { Component } from "react";
//import CryptoPoke from "./build/contracts/CryptoPoke.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import bulbasaur from "./bulbasaur.jpeg";
import charmander from "./charmander.jpeg";
import squirtle from "./squirtle.jpeg";
import ivysaur from "./ivysaur.jpeg";
import charmeleon from "./charmeleon.jpeg";
import wartortle from "./wartortle.jpeg";
import venusaur from "./venusaur.jpeg";
import charizard from "./charizard.jpeg";
import blastoise from "./blastoise.jpeg";
import pokemonbackground from "./pokemonbackground.jpeg";

class App extends Component {
  constructor(props){
    super(props);

   this.state={
    txtStatus: "",
    pokemonIdToLevelUp: undefined,
    allyId: undefined,
    enemyId: undefined,
    newPokemonNickname: "", 
    otherAccount: "",
    displayedPokemons2:[],
    displayedPokemons3:[],
    web3: null, 
    accounts: null, 
    contract: null
   }
   /*this.handleAllyIdChange = this.handleAllyIdChange.bind(this);
   this.handleEnemyIdChange = this.handleEnemyIdChange.bind(this);*/
  }



  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const instance = new web3.eth.Contract(
        [
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "_owner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "_approved",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "enemyName",
                "type": "string"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "damageTaken",
                "type": "uint256"
              }
            ],
            "name": "EnemyPokemonDamaged",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "string",
                "name": "previousName",
                "type": "string"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "currentName",
                "type": "string"
              }
            ],
            "name": "EvolvedPokemon",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "pokemonId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "pokedexNum",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
              }
            ],
            "name": "LeveledUp",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "nickname",
                "type": "string"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "dna",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "pokedexNum",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "stype",
                "type": "string"
              }
            ],
            "name": "NewPokemon",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "enemyName",
                "type": "string"
              }
            ],
            "name": "PokemonDeath",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "_from",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "_to",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "string",
                "name": "_name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_nickname",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "_dna",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_pokedexNum",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "_stype",
                "type": "string"
              }
            ],
            "name": "_createPokemon",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "address",
                "name": "_from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
              }
            ],
            "name": "_transfer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "address",
                "name": "_approved",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
              }
            ],
            "name": "approve",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_pokemonId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_targetId",
                "type": "uint256"
              }
            ],
            "name": "attack",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
              }
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_pokemonId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_targetId",
                "type": "uint256"
              }
            ],
            "name": "calculateDamage",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_pokemonId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "_newName",
                "type": "string"
              }
            ],
            "name": "changeName",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_pokemonId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "_newNickname",
                "type": "string"
              }
            ],
            "name": "changeNickname",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_pokemonId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_newPokedexNum",
                "type": "uint256"
              }
            ],
            "name": "changePokedexNum",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "string",
                "name": "_nickname",
                "type": "string"
              }
            ],
            "name": "createRandomPokemon",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
              }
            ],
            "name": "getPokemonsByOwner",
            "outputs": [
              {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "isOwner",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_pokemonId",
                "type": "uint256"
              }
            ],
            "name": "levelUp",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
              }
            ],
            "name": "ownerOf",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "pokedexNumToName",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "pokemonNumToType",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "pokemonToOwner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "pokemons",
            "outputs": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "nickname",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "stype",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "dna",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "pokedexNum",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "level",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "readyTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "health",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_fee",
                "type": "uint256"
              }
            ],
            "name": "setLevelUpFee",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "address",
                "name": "_from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
              }
            ],
            "name": "transferFrom",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        '0xe515AB0B4d3653FE7c530A6fA357EF5B3B0dF610',
      );
      var userAccount;
      /*const accounts = await web3.eth.getAccounts();
      await web3.eth.getBlockNumber().then(console.log);
      console.log(instance.options)
      console.log("reached")
      if (accounts[0] !== userAccount) {
          userAccount = accounts[0];
      }
      console.log(instance);
      this.setState({ web3: web3, accounts: userAccount, contract: instance });
      this.displayPokemons(this.state.accounts);
      this.displayOtherPokemons(this.state.otherAccount).catch(function(error){
        //just do nothing, returns promise resolved with undefined
    })*/

   setInterval(async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts[0] !== userAccount) {
          userAccount = accounts[0];
      }
      this.setState({ web3: web3, accounts: userAccount, contract: instance });
      this.displayPokemons(this.state.accounts);
      this.displayOtherPokemons(this.state.otherAccount).catch(function(error){
        //just do nothing, returns promise resolved with undefined
    })
    }, 1000);

      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  createRandomPoke(name) {
    if(name.length > 12){
      console.log("Name length too long! At most 12 characters only")
    } else if(name.length === 0) {
    } else {
      this.state.contract.methods.createRandomPokemon(name)
        .send({ from: this.state.accounts })
        .on("receipt", async (receipt)=> {
            console.log("Congratulations you created a " + receipt.events.NewPokemon.returnValues.name);
          })
        .on("error", function(error) {
          console.log("error creating new pokemon : "+ error)
        })
    }   
  }

   
    getPokemonByOwner(owner) {
      return this.state.contract.methods.getPokemonsByOwner(owner).call()
    }

    attackPokemon(id1, id2) {
      
      this.state.contract.methods.attack(id1, id2)
      .send({ from: this.state.accounts })
      .on("receipt", function(receipt) {
        if(receipt.events.EnemyPokemonDamaged.returnValues.damageTaken === 10) {
          console.log("its not very effective...")
        } else {
          console.log("its super effective!")
        }
        console.log("your " + receipt.events.EnemyPokemonDamaged.returnValues.name + 
          " damaged " + receipt.events.EnemyPokemonDamaged.returnValues.enemyName  + 
          " for " + receipt.events.EnemyPokemonDamaged.returnValues.damageTaken + " health!")
        console.log("You have defeated the enemy " + receipt.events.PokemonDeath.returnValues.enemyName + "!")
      })
      .on("error", function(error) {
        console.log("error attacking pokemon : "+ error)
        
      })
    }

    getPokemonDetails(id) {
      return this.state.contract.methods.pokemons(id).call()
    }
  
    async displayPokemons(accounts) {
      var results = [];
      await this.getPokemonByOwner(accounts).then(async ids =>{
        for(let id of ids) {
          await this.getPokemonDetails(id).then(async pokemon => {
            results.push(pokemon)
          })
        }
      })
      this.setState({ displayedPokemons2: results})
    }

    async displayOtherPokemons(accounts) {
      var results2 = [];
      await this.getPokemonByOwner(accounts).then(async ids =>{
        for(let id of ids) {
          await this.getPokemonDetails(id).then(async pokemon => {
            results2.push(pokemon)
          })
        }
      })
      this.setState({ displayedPokemons3: results2})
    }
  
    levelUp(id) {
      this.state.contract.methods.levelUp(id)
      .send({ from: this.state.accounts })
      .on("receipt", function(receipt) {
        console.log(receipt.events.LeveledUp.returnValues.name + " leveled up!")
        console.log("Congratulations! Your " + receipt.events.EvolvedPokemon.returnValues.previousName + " evolved into a " +
        receipt.events.EvolvedPokemon.returnValues.currentName)
      })
      .on("error", function(error) {
        console.log("error levelling up : ")
      })
    }

  handleCreateNewPokemonButton = (event) => {
    this.createRandomPoke(this.state.newPokemonNickname)
    this.displayPokemons(this.state.accounts)
  }

  handleOtherAccountChange = (event) => {
    this.setState({otherAccount:event.target.value})
    
  }

  handleAttackButton = (event) => { 
    this.attackPokemon(this.state.allyId, this.state.enemyId);
    /*<input type="text" value={this.state.allyId} onChange={this.handleAllyIdChange} />
    <input type="text" value={this.state.enemyId} onChange={this.handleEnemyIdChange} />*/
  }

  handleNewPokemonNameChange = (event) => {
    this.setState({newPokemonNickname:event.target.value})
  }

  handleDisplayOtherAccountPokemon = (event) => {
    this.displayOtherPokemons(this.state.otherAccount).catch(function(error){
      //just do nothing, returns promise resolved with undefined
  })
  }

  renderImage(name) {
     if (name === "bulbasaur"){
        return (
            <img src= {bulbasaur} alt = "hi"/>
        )
    } else if (name === "charmander"){
      return (
        <img src={charmander} alt = "hi"/>
    ) 
      }else if (name === "squirtle") {
      return (
        <img src={squirtle} alt = "hi"/>
    )
    }else if (name === "ivysaur") {
      return (
        <img src={ivysaur} alt = "hi"/>
    )
    
      }else if (name === "charmeleon") {
      return (
        <img src={charmeleon} alt = "hi"/>
    )
      }else if (name === "wartortle") {
      return (
        <img src={wartortle} alt = "hi"/>
    )
      }else if (name === "venusaur") {
      return (
        <img src={venusaur} alt = "hi"/>
    )
      }else if (name === "charizard") {
      return (
        <img src={charizard} alt = "hi"/>
    )
      }else if (name === "blastoise") {
      return (
        <img src={blastoise} alt = "hi"/>
    )
  }
}

  handleAllyIdChange = (event) =>   { 
    this.setState({allyId: event.target.value});
  }

  handleEnemyIdChange = (event) => { 
    this.setState({enemyId: event.target.value});
  }

  handleLevelUpChange = (event) => { 
    this.setState({pokemonIdToLevelUp: event.target.value});
  }

  handleLevelUpPokemon = (event) => { 
    this.levelUp(this.state.pokemonIdToLevelUp);
    /*<input type="text" value={this.state.allyId} onChange={this.handleAllyIdChange} />
    <input type="text" value={this.state.enemyId} onChange={this.handleEnemyIdChange} />*/
  }

  render() {
    
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App" style={{backgroundImage: 'url(' + require('./pokemonbackground.jpeg') + ')'} }> 
      <div className = "background"> </div>
        <h1>CryptoPoke  {this.state.txtStatus} </h1>
        <h2>Create your own random Pokemons and attack other Players' Pokemon!</h2>
              <input type="text" value={this.state.newPokemonNickname} placeholder="nickname" onChange={this.handleNewPokemonNameChange} />
              <button onClick={this.handleCreateNewPokemonButton} >Create Pokemon(Max 6)</button>
              &nbsp;
              &nbsp;
              &nbsp;
              <input type="text" value={this.state.otherAccount} placeholder="account number" onChange={this.handleOtherAccountChange}/>      
              <button onClick={this.handleDisplayOtherAccountPokemon}>Show Other Account Pokemon</button>
              <br></br>
              <br></br>
            
              <input type="number" value={this.state.allyId} placeholder="your Pokemon Id" onChange={this.handleAllyIdChange} />
              <input type="number" value={this.state.enemyId} placeholder="enemy Pokemon Id" onChange={this.handleEnemyIdChange} />  
              <button onClick={this.handleAttackButton} >Attack Opponent Pokemon</button>
              &nbsp;
              &nbsp;
              &nbsp;
              <input type="number" value={this.state.pokemonIdToLevelUp} placeholder="Pokemon Id" onChange={this.handleLevelUpChange} />  
              <button onClick={this.handleLevelUpPokemon} >level-up Pokemon</button>
            <br></br>
            <br></br>
            <table border="1" className="table" >
            <caption className = "pokemon1">Your pokemon</caption>
              <thead>
                <tr >
                  <td>Name</td>
                  <td>Nickname</td>
                  <td>Id</td>
                  <td>Image</td>
                  <td>PokedexNum</td>
                  <td>DNA</td>
                  <td>Level</td>
                  <td>Health</td>
                </tr>

              </thead >
              <tbody>
                
              {this.state.displayedPokemons2.map(( pokemon, index ) => {
                  return (
                    <tr key={index}>
                      <td>{pokemon.name}</td>
                      <td>{pokemon.nickname}</td>
                      <td>{pokemon.id}</td>
                      <td>{this.renderImage(pokemon.name)}</td>
                      <td>{pokemon.pokedexNum}</td>
                      <td>{pokemon.dna}</td>
                      <td>{pokemon.level}</td>
                      <td>{pokemon.health}</td>
                      </tr>
                  );
              })
              }
              </tbody>
            </table>
            <br></br>
            <table border="1" className="table2">
   
            <caption className = "pokemon2">Other player's pokemon</caption>

              <thead>
                <tr>
                <td>Name</td>
                <td>Nickname</td>
                <td>Id</td>
                  <td>Image</td>
                  <td>PokedexNum</td>
                  <td>DNA</td>
                  <td>Level</td>
                  <td>Health</td>
                </tr>
              </thead>
              <tbody>
              {this.state.displayedPokemons3.map(( pokemon, index ) => {
                  return (
                    <tr key={index}>
                      <td>{pokemon.name}</td>
                      <td>{pokemon.nickname}</td>
                      <td>{pokemon.id}</td>
                      <td>{this.renderImage(pokemon.name)}</td>
                      <td>{pokemon.pokedexNum}</td>
                      <td>{pokemon.dna}</td>
                      <td>{pokemon.level}</td>
                      <td>{pokemon.health}</td>
                      </tr>
                );
                })
                }
              </tbody>
            </table>
 
      </div>
    );
  }
}
export default App;
