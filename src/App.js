import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Components/Game'
import { Button, Heading } from 'grommet';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      enterGame: true
    }


  }


  renderContent() {
    if (this.state.enterGame) {
      return <Game goBack={() => { this.setState({ enterGame: false }) }} />
    }
    return (
      <React.Fragment>
        <img className="App-logo" src="w-stone.png" />

        <h1 style={{ display: 'block' }}>The Royale Game Of Ur </h1>

        <Button
          color="white"
          primary={true}
          label="Start Game"
          onClick={() => { this.setState({ enterGame: true }) }}
        />
      </React.Fragment>

    )
  }
  render() {
    const content = this.renderContent()

    return (
      <div className="App">
        <header className="App-header">

          {content}
        </header>
      </div>
    );
  }
}

export default App;
