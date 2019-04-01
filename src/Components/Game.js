import React, { Component } from "react";
import { Button, Heading } from "grommet";
import { Icons } from "grommet-icons";
import SvgBoard from "./SVGBoard";
import RandomAI from "../Ai/RandomAI";
import GudeaAI from "../Ai/GudeaAI";
import "./Game.css";
import GameEngine from "../GameEngine";

const WHITE = "w";
const BLACK = "b";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      gameState: null,
      humanData: {
        stoneColor: WHITE,
        name: "Messi"
      },
      selectedStone: false,
      diceResult: 0,
      humanDidRollDice: false,
      computerDice: 0
    };
  }
  componentDidMount() {
    if (!this.gameEngine) {
      this.gameEngine = new GameEngine();
      let state = this.gameEngine.getState();
      this.setState({ gameState: state });
    }

    switch (this.props.aiType) {
      case "gudea":
        this.ai = new GudeaAI(3, BLACK);
        break;
      case "random":
        this.ai = new RandomAI();
        break;
      default:
    }
  }
  renderUnmovedStones(color) {
    //  console.log(color + "-stone.png")
    if (this.state.gameState) {
      // console.log(' this.state.gameState', this.state.gameState.board)
      const stonesCount = this.state.gameState.board[0][color];
      let stones = [];
      for (let i = 0; i < stonesCount; i++) {
        stones.push(
          <img
            alt=""
            onClick={() => console.log(color + "-stone")}
            src={color + "-stone.png"}
            style={{ marginRight: "2px", width: "50px", height: "50px" }}
            className={
              this.state.humanData.stoneColor === color &&
              this.state.selectedStone === 0 &&
              i === 0
                ? " stone-glow boox"
                : ""
            }
          />
        );
      }
      return (
        <div
          className="wrapper"
          onClick={() => {
            if (
              color === WHITE &&
              this.state.gameState.currentPlayer === WHITE
            ) {
              this.onSquareClick("0");
            }
          }}
        >
          {stones}
        </div>
      );
    }
  }

  renderFinishLineStones(color) {
    if (this.state.gameState) {
      const stonesCount = this.state.gameState.board[15][color];
      let stones = [];
      for (let i = 0; i < stonesCount; i++) {
        stones.push(
          <img
            alt=""
            className="box"
            src={color + "-stone.png"}
            style={{ marginRight: "2px", width: "50px", height: "50px" }}
          />
        );
      }
      return (
        <div
          className="wrapper"
          ref={c => {
            this[color + "15"] = c;
          }}
          onClick={() => this.onSquareClick(color + "15")}
        >
          {stones}
        </div>
      );
    }
  }
  renderDiceRoller(color) {
    if (this.state.gameState && color === WHITE) {
      return (
        <div>
          <Button
            color="white"
            primary={true}
            label="Roll dice"
            onClick={this.rollDice.bind(this)}
            disabled={this.state.humanDidRollDice}
          />
          <h2 style={{ margin: 0 }}>{this.state.diceResult}</h2>
          {this.state.gameState && (
            <p style={{ margin: 0 }}>
              {this.state.gameState.currentPlayer === "w" ? "Your turn" : ""}{" "}
            </p>
          )}
        </div>
      );
    } else if (this.state.computerDice) {
      return (
        <div>
          <p>Computer rolled</p>
          <h2 style={{ margin: 0 }}>{this.state.computerDice}</h2>
        </div>
      );
    }
  }
  rollDice() {
    if (!this.state.humanDidRollDice) {
      this.setState({
        humanDidRollDice: true,
        diceResult: this.state.gameState.diceResult
      });
      if (this.state.gameState.diceResult == 0) {
        if (
          (this.state.gameState.diceResult === 0 &&
            this.state.gameState.currentPlayer === WHITE) ||
          Object.keys(this.gameState.state.gameState.possibleMoves).length === 0
        ) {
          const alertMessage =
            this.state.gameState.diceResult === 0
              ? "You rolled a 0. Computer turn"
              : "No possible move. Computer turn.";
          alert(alertMessage);
          const newState = this.gameEngine.voidTurn(WHITE);
          if (newState) {
            this.setState({ gameState: newState });
            this.endHumanTurn(newState);
          } else {
            console.log(
              "something bad happend newState, this.stsate",
              newState,
              this.state
            );
          }

          return;
        }
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.gameState !== this.state.gameState &&
      this.state.gameState.currentPlayer === "b"
    ) {
      setTimeout(this.makeAIMove.bind(this), 100);
    }
    if (this.state.gameState && this.state.gameState.winner) {
      this.handleGameHasEnded();
    }
  }

  makeAIMove() {
    const currenGameState = this.state.gameState;
    if (!currenGameState.winner) {
      const move = this.ai.calculateMove(currenGameState);
      const newState = move
        ? this.gameEngine.takeTurn(BLACK, move)
        : this.gameEngine.voidTurn(BLACK);
      if (newState) {
        this.setState({
          gameState: newState,
          computerDice: currenGameState.diceResult
        });
        return true;
      }
      console.log("Ai move failed");
      return false;
    } else {
      this.handleGameHasEnded();
    }
  }

  endHumanTurn() {
    this.setState({ selectedStone: null, humanDidRollDice: false });
  }
  makeHumanMove(move) {
    const currenGameState = this.state.gameState;
    if (!currenGameState.winner) {
      const newState = this.gameEngine.takeTurn(WHITE, move);
      if (newState) {
        this.setState({ gameState: newState });
        this.endHumanTurn(newState);
        return true;
      }
      alert("false state");
      return false;
    } else {
      this.handleGameHasEnded();
    }
  }

  handleGameHasEnded() {
    const winnerMEssage =
      this.state.gameState.winner === "w"
        ? "Congratulations, you won!"
        : "You lose.. :(";
    alert("game has ended! \n" + winnerMEssage);
  }
  selectStone(position) {
    //UI only action
    // console.log('in select stone', position);
    if (this.state.selectedStone === position) {
      this.setState({ selectedStone: null });
    } else {
      this.setState({ selectedStone: position });
    }
  }
  onSquareClick(square) {
    if (!this.state.humanDidRollDice) {
      console.log("you have to roll dice");
      return;
    }
    if (!square.includes("b")) {
      const squareIndex = parseInt(square.replace("b", "").replace("w", ""));
      const gameState = this.state.gameState;
      const selectedStone = this.state.selectedStone;
      console.log(
        "gameState.board[squareIndex][WHITE] ",
        gameState.board[squareIndex]
      );
      if (gameState.board[squareIndex][WHITE] === 1 && squareIndex != 15) {
        this.selectStone(squareIndex);
        return;
      }

      if (
        squareIndex <= selectedStone &&
        gameState.board[squareIndex][WHITE] > 0 &&
        squareIndex != 15
      ) {
        this.selectStone(squareIndex);
        return;
      }
      if (gameState && gameState.currentPlayer === WHITE) {
        if (selectedStone || selectedStone === 0) {
          if (gameState.possibleMoves[selectedStone] === squareIndex) {
            const moveFrom = selectedStone;
            this.makeHumanMove(moveFrom);
          } else {
            this.selectStone(null);
          }
        } else if (
          (!selectedStone || selectedStone > 16) &&
          gameState.board[squareIndex][WHITE] > 0
        ) {
          // if no stone selected
          this.selectStone(squareIndex);
        }
      }
    }
  }

  positionDicesOnBoard() {
    let stonesOnBoard = [];
    if (this.state.gameState && this.state.gameState.board) {
      const board = Object.values(this.state.gameState.board);
      board.map((field, index) => {
        if (index !== 0 && index !== 15) {
          if (field.w > 0) {
            const positionReference =
              index <= 4 || index >= 13 ? "w" + index : index;
            const square = this[positionReference]
              ? this[positionReference].getBoundingClientRect()
              : false;
            let position;
            if (square) {
              position = {
                top: square.top + "px",
                left: square.left + "px"
              };
            }
            stonesOnBoard.push(
              <img
                alt=""
                className={
                  this.state.selectedStone === index ? " stone-glow" : ""
                }
                onClick={() => this.onSquareClick("" + index)}
                src={"w-stone.png"}
                style={{
                  ...position,
                  position: "absolute",
                  width: "50px",
                  height: "50px",
                  zIndex: "100"
                }}
              />
            );
          }
          if (field.b > 0) {
            const positionReference =
              index <= 4 || index >= 13 ? "b" + index : index;
            //   console.log('positionReference ', positionReference)

            const square = this[positionReference]
              ? this[positionReference].getBoundingClientRect()
              : false;

            let position;
            if (square) {
              position = {
                top: square.top + "px",
                left: square.left + "px"
              };
            }

            stonesOnBoard.push(
              <img
                alt=""
                onClick={() => this.onSquareClick("" + index)}
                src={"b-stone.png"}
                style={{
                  ...position,
                  position: "absolute",
                  width: "50px",
                  height: "50px",
                  zIndex: "100"
                }}
              />
            );
          }
        }
      });
    }
    return stonesOnBoard;
  }

  renderNotOnBoardStones(color) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {this.renderUnmovedStones(color)}
        {this.renderDiceRoller(color)}
        {this.renderFinishLineStones(color)}
      </div>
    );
  }

  render() {
    console.log("render.this.state", this.state);
    const stonesOnBoard = this.positionDicesOnBoard();
    return (
      <div className="game-container">
        <Button
          color="white"
          primary={true}
          label="Start over"
          onClick={this.props.goBack}
          style={{ position: "absolute", left: "14px", top: "14px" }}
        />
        {this.renderNotOnBoardStones(BLACK)}
        <SvgBoard
          onSquareClick={this.onSquareClick.bind(this)}
          setRef={(c, name) => {
            this[name] = c;
          }}
        />
        {stonesOnBoard}
        {this.renderNotOnBoardStones(WHITE)}
      </div>
    );
  }
}
export default Game;
