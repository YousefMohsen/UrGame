import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Components/Game'
import { Button, Heading } from 'grommet';
import Cookies from 'js-cookie';
const stepsText = ["Ur is a game for two players, with 7 stones each",
  "At the start of each turn four binary dice are thrown by the player, where the outcome of the dice roll (a number between 0 and 4) determines the number of squares that the player can move on the board",
  "This is the board. The aim of the game is to get all of your pieces all the way around. If an enemy piece lands on your piece then your piece is sent home.",
  "There are 5 rosette squares. If you land on a rosetta square you get another throw of the dice and your piece is safe from enemy attack."]
const stepsImages = ["/stonesTut1.png", "/diceTut1.png", "/boardTut1.png", "/boardTut2.png"]
// stones, dice,board, lucky stones
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      enterAIMenu: false,
      enterGame: false,
      aiType: 'gilgamesh',
      didShowTutorial:
        typeof window !== 'undefined'
          ? Cookies.get('did-show-tutorial')
          : true,
      step: 0,
      onAboutPage: false
    }


  }

  onTutorialEnd() {
    //  this.setState({ slideOutAnimation: true });
    // Cookies.set('did-show-tutorial', ' ', { expires: 365 });
    setTimeout(() => {
      //this.setState({ displayWarning: false });
    }, 1000);
  }
  renderContent() {
    const isMobile = window.innerWidth <= 500;

    if (isMobile) {

      return (
        <React.Fragment>


          <img className="App-logo" src="w-stone.png" />
          <h1 style={{ display: 'block', fontSize: '2rem' }}>Your screen is too small :/ </h1>
        </React.Fragment>
      )
    }
    if (this.state.onAboutPage) {

      return (
        <div>

          <Button
            color="white"
            primary={true}
            label="Back"
            onClick={() => { this.setState({ onAboutPage: false }) }}
            style={{ position: 'absolute', left: '14px', top: '14px' }}
          />



          <figure>
            <img src="originalBoard.jpg" />
            <figcaption>

              <p style={{ marginTop: 0, marginBottom: '20px', fontSize: '0.7em' }}>One of the five gameboards found by Sir Leonard Woolley in the Royal Cemetery at Ur, now held in the <a style={{ color: "white" }} href="https://www.britishmuseum.org/research/collection_online/collection_object_details.aspx?objectId=8817&partId=1">British Museum</a></p>

            </figcaption>
          </figure>


          <p style={{ padding: '0 10%', textAlign: 'left' }}>The Royal Game of Ur is a 4500-year-old board game originating from Mesopotamia (modern day Iraq). Its use spread to several cities across the ancient world. Examples of the game were found in Crete, Cyprus, Egypt, Jewish communities in India and other places.
       <br /> <br /> A cuneiform clay tablet -with an inscription of the rules was found in Babylon and translated from Akkadian by the British Museum, which published the set of rules online.
           This implementation of the Game of Ur is based on the set of rules that is published by the British Museum.
      </p>
        </div>

      )
    }

    if (this.state.enterGame) {
      // const didShowTutorial = false;
      if (!this.state.didShowTutorial) {
        return (
          <React.Fragment>
            <p style={{ padding: '0 10%', textAlign: 'left' }}>{stepsText[this.state.step]}</p>

            <img src={stepsImages[this.state.step]} />
            <div style={{ width: '30%', display: "flex" }}>

              <Button
                color="white"
                primary={true}
                label={this.state.step < stepsText.length - 1 ? 'Next' : 'Start game'}
                onClick={() => {

                  if (this.state.step < stepsText.length - 1) {
                    this.setState({ step: this.state.step + 1 })

                  }
                  else {
                    this.setState({ step: 0, didShowTutorial: true });
                    this.onTutorialEnd()

                  }
                }}
                style={{ margin: '20px 0px', display: 'block', width: '100%' }}
              />


            </div>
          </React.Fragment>
        )
      }
      return <Game aiType={this.state.aiType} goBack={() => { this.setState({ enterGame: false, enterAIMenu: false }) }} />
    }
    if (this.state.enterAIMenu) {
      return (

        <div style={{ width: '30%' }}>

          <img className="App-logo" src="w-stone.png" />

          <h2>Choose an opponent</h2>

          <Button
            color="white"
            primary={true}
            label="Gudea (Expectimax - hard)"
            onClick={() => {
              this.setState({ enterGame: true, aiType: "gudea" });
            }}
            style={{ margin: "20px 0px", display: "block", width: "100%" }}
          />

          <Button
            color="white"
            primary={true}
            label="Gilgamesh (Expectimax - medium)"
            onClick={() => {
              this.setState({ enterGame: true, aiType: "gilgamesh" });
            }}
            style={{ margin: "20px 0px", display: "block", width: "100%" }}
          />

          {   /* <Button
            color="white"
            primary={true}
            label='Nabu (x AI)'
            onClick={() => { this.setState({ enterGame: true, aiType: 'nabu' }) }}
            style={{ margin: '20px 0px', display: 'block', width: '100%' }}

          />*/}

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
            onClick={() => {
              this.setState({ enterAIMenu: false });
            }}
            style={{ position: "absolute", left: "14px", top: "14px" }}
          />
        </div>
      );
    }
    return (
      <React.Fragment>


        <img className="App-logo" src="w-stone.png" />
        <h1 style={{ display: 'block' }}>The Royale Game Of Ur </h1>
        <div style={{ width: '30%' }}>

          <Button
            style={{ margin: '20px 0px', display: 'block', width: '100%' }}

            color="white"
            primary={true}
            label="Start Game"
            onClick={() => { this.setState({ enterAIMenu: true, }) }}
          />
          <Button
            style={{ margin: '20px 0px', display: 'block', width: '100%' }}

            color="white"
            primary={true}
            label="About"
            onClick={() => { this.setState({ onAboutPage: true, }) }}
          />
        </div>
      </React.Fragment>

    )
  }

  renderFooter() {
    return <div class="container" />;
  }
  render() {
    const content = this.renderContent();
    const footer = this.renderFooter();

    return (
      <div className="App">
        <header className="App-header">{content}</header>
        {footer}
      </div>
    );
  }
}

export default App;
