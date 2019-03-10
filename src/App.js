import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Components/Game'
import { Button, Heading } from 'grommet';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      enterGame: false
    }


  }


  renderContent() {
    if (this.state.enterGame) {
      return <Game />
    }
    else {

      return (
        <React.Fragment>


          <Heading strong={true}
            uppercase={true}
            truncate={false}>
            The Royale Game Of Ur
</Heading>

          <Button
            color="white"
            primary={true}
            label="Start Game"
            onClick={() => { this.setState({ enterGame: true }) }}
          />
        </React.Fragment>

      )
    }
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
