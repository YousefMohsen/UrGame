import React, { Component } from 'react';
import { Button, Heading } from 'grommet';
import { Icons } from 'grommet-icons';
import SvgBoard from './SVGBoard'
import GilgameshAI from '../Ai/GilgameshAI'
import RandomAI from '../Ai/RandomAI'

import './Game.css'

//const GilgameshAI = require('../Ai/GilgameshAI');

import GameEngine from '../GameEngine';
//const GameEngine = require('../GameEngine');

const initialState = {
    currentPlayer: 'w',
    dice: [0, 0, 0, 0],
    diceResult: 0,
    possibleMoves: { '0': 0 },
    board:
        [{ w: 7, b: 7 },
        { w: 0, b: 0 },
        { w: 0, b: 0 },
        { w: 0, b: 0 },
        { w: 0, b: 0 },
        { w: 0, b: 0 },
        { w: 0, b: 0 },
        { w: 0, b: 0 },
        { w: 0, b: 0 },
        { w: 0, b: 0 },
        { w: 0, b: 0 },
        { w: 0, b: 0 },
        { w: 0, b: 0 },
        { w: 0, b: 0 },
        { w: 0, b: 0 },
        { w: 5, b: 0 }]

}

const WHITE = 'w';
const BLACK = 'b'

class Game extends Component {

    constructor() {
        super();
        this.state = {
            gameState: null,
            humanData: {
                stoneColor: WHITE,
                name: 'Messi'
            },
            selectedStone: false,
            diceResult: 0,
            humanDidRollDice: false,
            computerDice: 0
        }

        

    }
    componentDidMount() {
        if (!this.gameEngine) {
            this.gameEngine = new GameEngine;
            let state = this.gameEngine.getState();
            this.setState({ gameState: state });
        }

        switch(this.props.aiType){
            case 'nabu':
            this.ai = new RandomAI();//implement nabu
            break;
            case 'gilgamesh':
            this.ai = new GilgameshAI();
            break;
            case 'random':
            this.ai = new RandomAI();
            break;

        }

    }

    /* moveStoneToSquare(color, from, to) {
         //check if gameState
         let board = this.state.gameState.board;
         const otherColor = color === WHITE ? BLACK : WHITE;
         board[from][color]--;
         if (board[to][otherColor] === 1) {//if opponent has a stone
             board[to][otherColor] = 0;
             board[0][otherColor]++;
         }
         board[to][color] = 1
         //  console.log('Board', board)
 
         this.setState({ gameState: { ...this.state.gameState, board } })
     }*/
    renderUnmovedStones(color) {
        //  console.log(color + "-stone.png")
        if (this.state.gameState) {
            // console.log(' this.state.gameState', this.state.gameState.board)
            const stonesCount = this.state.gameState.board[0][color]
            let stones = [];
            for (let i = 0; i < stonesCount; i++) {
                stones.push(<img className="boox" onClick={() => console.log(color + '-stone')} src={color + "-stone.png"} style={{ marginRight: '2px', width: '50px', height: '50px' }} className={(this.state.humanData.stoneColor === color && this.state.selectedStone === 0 && i === 0 ? " stone-glow" : "")} />)
            }
            return (
                <div className="wrapper" onClick={() => { if (color === WHITE && this.state.gameState.currentPlayer === WHITE) { this.onSquareClick('0') } }}>
                    {stones}
                </div>
            )
        }
    }

    renderFinishLineStones(color) {
        //  console.log(color + "-stone.png")
        if (this.state.gameState) {
            // console.log(' this.state.gameState', this.state.gameState.board)
            const stonesCount = this.state.gameState.board[15][color]
            let stones = [];
            for (let i = 0; i < stonesCount; i++) {
                stones.push(<img className="box" src={color + "-stone.png"} style={{ marginRight: '2px', width: '50px', height: '50px' }} />)
            }
            return (
                <div className="wrapper" ref={(c) => { this[color + '15'] = c }} onClick={() => this.onSquareClick(color + '15')}>
                    {stones}
                </div>
            )
        }
    }
    renderDiceRoller(color) {
        if (this.state.gameState && color === WHITE) {
            return (
                <div >
                    <Button
                        color="white"
                        primary={true}
                        label="Roll dice"
                        onClick={this.rollDice.bind(this)}
                        disabled={this.state.humanDidRollDice}
                    />
                    <h2 style={{ margin: 0 }}>{this.state.diceResult}</h2>
                    {this.state.gameState && <p style={{ margin: 0 }} >{this.state.gameState.currentPlayer === 'w' ? 'Your turn' : ''} </p>}
                </div>
            )
        }

        else if (this.state.computerDice) {
            return (
                <div >
                    <p>Computer rolled</p>
                    <h2 style={{ margin: 0 }}>{this.state.computerDice}</h2>
                </div>

            )
        }

    }
    rollDice() {//dice are rolled in gameengine. Show dice first when user clicks roll dice 
        /*
        const roll = Math.floor(Math.random() * 5);
        this.setState({ gameState: { ...this.state.gameState, diceResult: roll } })
        //TODO: update game state*/
        //   this.makeAIMove();
        if (!this.state.humanDidRollDice) {
            this.setState({ humanDidRollDice: true, diceResult: this.state.gameState.diceResult });
            if (this.state.gameState.diceResult == 0) {

                if (this.state.gameState.diceResult === 0 && this.state.gameState.currentPlayer === WHITE) {
                    alert('You rolled a 0. Computer turn');
                    const newState = this.gameEngine.voidTurn(WHITE);
                    if (newState) {
                        this.setState({ gameState: newState });
                        this.endHumanTurn(newState);
                    }
                    else {
                        console.log('something bad happend newState, this.stsate', newState, this.state)
                    }



                    return;
                }

            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.gameState !== this.state.gameState && this.state.gameState.currentPlayer === 'b') {
            this.makeAIMove();
        }
        if (this.state.gameState && this.state.gameState.winner) {
            this.handleGameHasEnded();
        }



    }

    makeAIMove() {
        const currenGameState = this.state.gameState;
        if (!currenGameState.winner) {
            //this.setState({computerDice: currenGameState.diceResult})
            const move = this.ai.calculateMove(currenGameState);
            console.log('ai move',move)
            // console.log('Ai move ', move)
           const newState = this.gameEngine.takeTurn(BLACK, move);
            // console.log('new state')
            if (newState) {
                this.setState({ gameState: newState, computerDice: currenGameState.diceResult });
                //human turn
                return true;
            }
            console.log('makeAIMove failed', newState, 'currentState', currenGameState)
            alert('Ai move failed')

            return false;

        }
        else {
            this.handleGameHasEnded();
        }
    }

    endHumanTurn() {
        this.setState({ selectedStone: null, humanDidRollDice: false });
    }
    makeHumanMove(move) {
        const currenGameState = this.state.gameState;
        if (!currenGameState.winner) {
            //console.log('move',move)
            const newState = this.gameEngine.takeTurn(WHITE, move);

            // console.log('new state',newState)
            if (newState) {
                this.setState({ gameState: newState });
                this.endHumanTurn(newState);

                return true;
            }
            alert('false state')
            //  console.log('false StatecurrenGameState', currenGameState)
            return false;


        }
        else {
            this.handleGameHasEnded();
        }
    }

    handleGameHasEnded() {
        const winnerMEssage = this.state.gameState.winner === 'w' ? 'Congratulations, you won!' : 'You lose.. :('
        alert('game has ended! \n' + winnerMEssage);
    }
    selectStone(position) {//UI only action
        // console.log('in select stone', position);
        if (this.state.selectedStone === position) {
            this.setState({ selectedStone: null });
        } else {
            this.setState({ selectedStone: position });
        }

    }
    checkIfSquareHasStone(square) {
        const gameState = this.state.gameState;


    }

    onSquareClick(square) {
        //  console.log('square',square)
        if (!this.state.humanDidRollDice) {
            console.log('you have to roll dice');
            return;
        }
        if (!square.includes('b')) {
            const squareIndex = parseInt(square.replace('b', '').replace('w', ''));
            const gameState = this.state.gameState;
            const selectedStone = this.state.selectedStone;// ? parseInt(this.state.selectedStone): null;
            //console.log('gameState.board[squareIndex][WHITE] ', gameState.board[squareIndex])
            if (gameState.board[squareIndex][WHITE] === 1 && squareIndex != 15) {// check if square already has stone
                //    console.log('in gameState.board[squareIndex][WHITE] === 1')
                this.selectStone(squareIndex)
                return;
            }


            if (squareIndex <= selectedStone && gameState.board[squareIndex][WHITE] > 0 && squareIndex != 15) {//check if squareIndex is before selected square  
                this.selectStone(squareIndex)
                return;
            }
            if (gameState && gameState.currentPlayer === WHITE) {//if whites turn
                //   console.log('in second if,this.state.selectedStone',selectedStone)

                if (selectedStone || selectedStone === 0) {//if player has selected a stone
                    //console.log('in if selectedstone')

                    // console.log('\nstate.possibleMoves', gameState.possibleMoves)
                   // console.log('gameState.possibleMoves[this.state.selectedStone] =', gameState.possibleMoves[selectedStone], 'squareIndex', squareIndex)
                    if (gameState.possibleMoves[selectedStone] === squareIndex) {
                        const moveFrom = selectedStone;
                        this.makeHumanMove(moveFrom)
                        // console.log('in legal move', selectedStone)

                    }
                    else {
                        console.log('illegal move');
                        this.selectStone(null);
                    }

                    // console.log('move from', selectedStone, 'moveto', squareIndex);

                }
                else if ((!selectedStone || selectedStone > 16) && gameState.board[squareIndex][WHITE] > 0) {// if no stone selected
                    //console.log('no stone selected', selectedStone)
                    this.selectStone(squareIndex)
                }

            }
            //  console.log('squareIndex', squareIndex)
            //check if possible move
            //this.selectStone(formatedSquare)
        }

    }



    positionDicesOnBoard() {
        let stonesOnBoard = [];

        if (this.state.gameState && this.state.gameState.board) {



            const board = Object.values(this.state.gameState.board);

            board.map((field, index) => {
                if (index !== 0 && index !== 15) {

                    if (field.w > 0) {

                        const positionReference = index <= 4 || index >= 13 ? 'w' + index : index;
                        const square = this[positionReference] ? this[positionReference].getBoundingClientRect() : false;

                        let position;
                        if (square) {
                            position = {
                                top: square.top + 'px',
                                left: square.left + 'px',
                            }
                        }


                        stonesOnBoard.push(<img onClick={() => this.onSquareClick('' + index)} src={"w-stone.png"} style={{ ...position, position: 'absolute', width: '50px', height: '50px', zIndex: '100' }} />)

                    }
                    if (field.b > 0) {
                        const positionReference = index <= 4 || index >= 13 ? 'b' + index : index;
                        //   console.log('positionReference ', positionReference)

                        const square = this[positionReference] ? this[positionReference].getBoundingClientRect() : false;

                        let position;
                        if (square) {
                            position = {
                                top: square.top + 'px',
                                left: square.left + 'px',
                            }
                        }

                        stonesOnBoard.push(<img onClick={() => this.onSquareClick('' + index)} src={"b-stone.png"} style={{ ...position, position: 'absolute', width: '50px', height: '50px', zIndex: '100' }} />)


                    }


                }
            })


        }
        return stonesOnBoard;
    }

    renderNotOnBoardStones(color) {

        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {this.renderUnmovedStones(color)}
                {this.renderDiceRoller(color)}
                {this.renderFinishLineStones(color)}
            </div>)
    }

    render() {
     //   console.log('render.this.state', this.state)
       // console.log('this.props.aiType',this.props.aiType)
        const stonesOnBoard = this.positionDicesOnBoard();
        return (
            <div className="game-container">
                <Button
                    color="white"
                    primary={true}
                    label="Start over"
                    onClick={this.props.goBack}
                    style={{ position: 'absolute', left: '14px', top: '14px' }}
                />


                {this.renderNotOnBoardStones(BLACK)}

                <SvgBoard
                    onSquareClick={this.onSquareClick.bind(this)}
                    setRef={(c, name) => {

                        this[name] = c
                    }}
                />
                {stonesOnBoard}
                {this.renderNotOnBoardStones(WHITE)}



            </div>
        );
    }
}

export default Game;
