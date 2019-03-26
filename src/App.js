import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Components/Game'
import { Button, Heading } from 'grommet';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      enterAIMenu: true,
      enterGame: true,
      aiType:'gilgamesh'
    }


  }


  renderContent() {
    if (this.state.enterGame) {
      return <Game aiType={this.state.aiType} goBack={() => { this.setState({ enterGame: false, enterAIMenu: false }) }} />
    }
    if (this.state.enterAIMenu) {
      return (

        <div>

          <img className="App-logo" src="w-stone.png" />

          <h1>Choose an AI</h1>

          <Button
            color="white"
            primary={true}
            label='Gilgamesh (minimax AI)'
            onClick={() => { this.setState({ enterGame: true, aiType: 'gilgamesh' }) }}
            style={{ margin: '20px 0px', display: 'block', width: '100%' }}
          />

          <Button
            color="white"
            primary={true}
            label='Nabu (x AI)'
            onClick={() => { this.setState({ enterGame: true, aiType: 'nabu' }) }}
            style={{ margin: '20px 0px', display: 'block', width: '100%' }}

          />

          <Button
            color="white"
            primary={true}
            label='Enkidu(Random player)'
            onClick={() => { this.setState({ enterGame: true, aiType: 'random' }) }}
            style={{ margin: '20px 0px', display: 'block', width: '100%' }}

          />

          <Button
            color="white"
            primary={true}
            label="Back"
            onClick={()=>{this.setState({ enterAIMenu: false })}}
            style={{ position: 'absolute', left: '14px', top: '14px' }}
          />

        </div>

      )

    }
    return (
      <React.Fragment>
        <img className="App-logo" src="w-stone.png" />
        <h1 style={{ display: 'block' }}>The Royale Game Of Ur </h1>
        <Button
          color="white"
          primary={true}
          label="Start Game"
          onClick={() => { this.setState({ enterAIMenu: true, }) }}
        />
      </React.Fragment>
    )
  }


renderFooter(){
  return( 
  <div class="container">
</div>)
}
  render() {
    const content = this.renderContent()
    const footer = this.renderFooter();

    return (
      <div className="App">
        <header className="App-header">

          {content}
        </header>
        {footer}
      </div>
    );
  }
}

export default App;
