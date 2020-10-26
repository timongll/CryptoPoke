import React, { Component } from "react";
import CryptoPoke from "./build/contracts/CryptoPoke.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
    const people = [];

    for (let i = 0; i < 10; i++) {
      people.push({
          name: i
      });
  }
   this.state={
    people: people,
    newPokemonNickname:"", 
    txtStatus: "hi", 
    displayedPokemons:[0,1,2,3,4,5],
    displayedPokemons2:[],
    web3: null, 
    accounts: null, 
    contract: null }
   }



  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Ge
      const instance = new web3.eth.Contract(
        CryptoPoke.abi,
        '0x1a773618b6d850934feF1A85561e0E17F953a539',
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3: web3, accounts:accounts[0], contract: instance });
      console.log(this.state.contract)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  createRandomPoke(name) {
    this.state.contract.methods.createRandomPokemon(name)
      .send({ from: this.state.accounts })
      .on("receipt", function(receipt) {
        console.log("receipt : ", receipt)
        console.log("created" + name)
      })
      .on("error", function(error) {
        console.log("error create new zombie : "+ error)
        // TODO: how to access to 'this'  in order to setState error? or should we consider using 
        // callback or promise instead of 'event emitter'
        // https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
      });
    }
  

  getPokemonByOwner(owner) {
    return this.state.contract.methods.getPokemonsByOwner(owner).call()
  }
  
  
  getPokemonDetails(id) {
    return this.state.contract.methods.pokemons(id).call()
  }
  
  displayPokemons(ids) {
    this.setState({txtStatus: "5"})
    this.setState({displayedPokemons2:[]})
    for (let id of ids) {
      console.log("aa" + id);
      this.getPokemonDetails(id).then(function(id) {
        this.setState( prevState => ({
          displayedPokemons2: [prevState.displayedPokemons2, id]
        }))
      }.bind(this))
    }
  }
  
  handleCreateNewPokemonButton = (event) => {
    this.createRandomPoke(this.state.newPokemonNickname)
  }
  handleDisplayPokemons = (event) => {
    this.displayPokemons(this.state.displayedPokemons);
  }

  handleNewPokemonNameChange = (event) => {
    this.setState({newPokemonNickname:event.target.value})
  }


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <label>
             
              <input type="text" value={this.state.newPokemonNickname} onChange={this.handleNewPokemonNameChange} />
              <button onClick={this.handleCreateNewPokemonButton} >Create Pokemon</button>
              <button onClick={this.handleDisplayPokemons} >Show Pokemon</button>
            </label>
        {this.state.displayedPokemons2.map(( pokemons, index) => (
          <p key = {index}>
            {pokemons.nickname}</p>
        ))}


        
      </div>
    );
  }
  /*var accountInterval = setInterval(function() {
    // Check if account has changed
    if (web3.eth.accounts[0] !== userAccount) {
      userAccount = web3.eth.accounts[0];
      // Call a function to update the UI with the new account
      getPokemonByOwner(userAccount)
      .then(displayPokemons);
    } else{
    }
  }, 100);

}



function displayPokemons(slots) {
  $("#pokemons").empty();
  for (slot of slots) {
    // Look up zombie details from our contract. Returns a `zombie` object
    getPokemonDetails(slot)
    .then(function(pokemons) {
      
      // Using ES6's "template literals" to inject variables into the HTML.
      // Append each one to our #zombies div
      $("#pokemons").append(
        `<div class="pokemon">
        <ul>
          <li>Name: ${pokemons.name}</li>
          <li>Nickname: ${pokemons.nickname}</li>
          <li>Type: ${pokemons.stype}</li>
          <li>Dna: ${pokemons.dna}</li>
          <li>PokedexNum: ${pokemons.pokedexNum}</li>
          <li>Level: ${pokemons.level}</li>
        </ul>
      </div>`)
    });
  }
}


/*function createRandomPokemon(nickname) {
  // This is going to take a while, so update the UI to let the user know
  // the transaction has been sent
  $("#txStatus").text("Creating new pokemon on the blockchain. This may take a while...");
  // Send the tx to our contract:
  return cryptoPoke.methods.createRandomPokemon(nickname)
  .send({ from: userAccount })
  .on("receipt", function(receipt) {
    $("#txStatus").text("Successfully created " + nickname + "!");
    // Transaction was accepted into the blockchain, let's redraw the UI
    getPokemonByOwner(userAccount).then(displayPokemons);
  })
  .on("error", function(error) {
    // Do something to alert the user their transaction has failed
    $("#txStatus").text(error);
  });
}

function getPokemonDetails(slot) {
  console.log("aa");
  return cryptoPoke.methods.pokemons(slot).call();
}  

function getPokemonByOwner(owner) {
  console.log("aa");
  return cryptoPoke.methods.getPokemonsByOwner(owner).call();
}
*/
}
export default App;
