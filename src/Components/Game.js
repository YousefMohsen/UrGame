import React, { Component } from 'react';
import { Button, Heading } from 'grommet';
import { Icons } from 'grommet-icons';
import SvgBoard from './SVGBoard'
import GilgameshAI from '../Ai/GilgameshAI'
import RandomAI from '../Ai/RandomAI'

import './Game.css'
import GameEngine from '../GameEngine';

const initialState = {
    currentPlayer: 'w',
    dice: [0, 0, 0, 0],
    diceResult: 1,
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
        { w: 0, b: 0 }]

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
            diceResult: null,
            humanDidRollDice: false
        }

        this.ai = new RandomAI();

    }
    componentDidMount() {
        if (!this.gameEngine) {
            this.gameEngine = new GameEngine;
            let state = this.gameEngine.getState();
            this.setState({ gameState: state });
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
                stones.push(<img onClick={() => console.log(color + '-stone')} src={color + "-stone.png"} style={{ marginRight: '2px', width: '50px', height: '50px' }} className={(this.state.humanData.stoneColor === color && this.state.selectedStone === 0 && i === 0 ? " stone-glow" : "")} />)
            }
            return (
                <div style={{ display: 'flex' }} onClick={() => { if (color === WHITE && this.state.gameState.currentPlayer === WHITE) { this.onSquareClick('0') } }}>
                    {stones}
                </div>
            )
        }
    }
    renderDiceRoller() {
        return (
            <div style={{ position: 'absolute', right: '20px', top: '25px' }}>
                <Button
                    color="white"
                    primary={true}
                    label="Roll dice"
                    onClick={this.rollDice.bind(this)}
                />
                <h2>{this.state.diceResult}</h2>
                <p>selectedStone: {this.state.selectedStone}</p>

                {this.state.gameState && <p>{this.state.gameState.currentPlayer === 'w' ? 'your' : 'computer'} turn</p>}
            </div>
        )
    }
    rollDice() {//dice are rolled in gameengine. Show dice first when user clicks roll dice 
        /*
        const roll = Math.floor(Math.random() * 5);
        this.setState({ gameState: { ...this.state.gameState, diceResult: roll } })
        //TODO: update game state*/
        //   this.makeAIMove();
        if (!this.state.humanDidRollDice) {
            this.setState({ humanDidRollDice: true, diceResult: this.state.gameState.diceResult })
        }
    }

    makeAIMove() {

        const currenGameState = this.state.gameState;
        if (!currenGameState.winner) {

            const move = this.ai.calculateMove(currenGameState);
console.log('Ai move ',move)
            const newState = this.gameEngine.takeTurn(BLACK, move);
            console.log('new state')
            if (newState ) {
                if( newState.currentPlayer===BLACK){
                    //Ai plays again
                    this.makeAIMove();
                }
                this.setState({ gameState: newState,diceResult: currenGameState.diceResult });
                //human turn
                return true;
            }
            console.log('makeAIMove failed',newState,'currentState',currenGameState)
            return false;

        }
        else {
            this.handleGameHasEnded();
        }
    }

    endHumanTurn() {
        this.setState({ selectedStone: null, humanDidRollDice: false  });
    }
    makeHumanMove(move) {
        const currenGameState = this.state.gameState;
        if (!currenGameState.winner) {

            const newState = this.gameEngine.takeTurn(WHITE, move);
            console.log('new state')
            if (newState) {
                this.setState({ gameState: newState});
                this.endHumanTurn(newState);
                if(!newState.currentPlayer!==WHITE ){
                    this.makeAIMove();
                }

                return true;
            }
            return false;


        }
        else {
            this.handleGameHasEnded();
        }
    }

    handleGameHasEnded() {
        alert('game has ended');
    }
    selectStone(position) {//UI only action
        console.log('in select stone', position);
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
        if (!this.state.humanDidRollDice) {
            console.log('you have to roll dice');
            return;
        }
        if (!square.includes('b')) {
            const squareIndex = parseInt(square.replace('b', '').replace('w', ''));
            const gameState = this.state.gameState;
            const selectedStone = this.state.selectedStone;// ? parseInt(this.state.selectedStone): null;
            console.log('gameState.board[squareIndex][WHITE] ',gameState.board[squareIndex] )
            if (gameState.board[squareIndex][WHITE] === 1) {// check if square already has stone
                console.log('in gameState.board[squareIndex][WHITE] === 1')
                this.selectStone(squareIndex)
                return;
            }


            if (squareIndex <= selectedStone && gameState.board[squareIndex][WHITE]>0) {//check if squareIndex is before selected square  
                this.selectStone(squareIndex)
                return;
            }
            if (gameState && gameState.currentPlayer === WHITE) {//if whites turn
                //   console.log('in second if,this.state.selectedStone',selectedStone)

                if (selectedStone || selectedStone === 0) {//if player has selected a stone
                    console.log('in if selectedstone')

                    console.log('\nstate.possibleMoves', gameState.possibleMoves)
                    console.log('gameState.possibleMoves[this.state.selectedStone] =', gameState.possibleMoves[selectedStone], 'squareIndex', squareIndex)
                    if (gameState.possibleMoves[selectedStone] === squareIndex) {
                        const moveFrom = selectedStone;
                        this.makeHumanMove(moveFrom)
                        console.log('in legal move', selectedStone)

                    }
                    else {
                        console.log('illegal move');
                        this.selectStone(null);
                    }

                    console.log('move from', selectedStone, 'moveto', squareIndex);

                }
                else if ((!selectedStone || selectedStone > 16 ) && gameState.board[squareIndex][WHITE]>0) {// if no stone selected
                    console.log('no stone selected', selectedStone)
                    this.selectStone(squareIndex)
                }

            }
            console.log('squareIndex', squareIndex)
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


                        stonesOnBoard.push(stonesOnBoard.push(<img id="messi" src={"w-stone.png"} style={{ ...position, position: 'absolute', width: '50px', height: '50px', zIndex: '100' }} />)
                        )
                    }
                    if (field.b > 0) {
                        const positionReference = index <= 4 || index >= 13 ? 'b' + index : index;
                        console.log('positionReference ', positionReference)

                        const square = this[positionReference] ? this[positionReference].getBoundingClientRect() : false;

                        let position;
                        if (square) {
                            position = {
                                top: square.top + 'px',
                                left: square.left + 'px',
                            }
                        }


                        stonesOnBoard.push(stonesOnBoard.push(<img id="messi" src={"b-stone.png"} style={{ ...position, position: 'absolute', width: '50px', height: '50px', zIndex: '100' }} />)
                        )

                    }


                }
            })


        }
        return stonesOnBoard;
    }


    render() {
        console.log('render.this.state', this.state)
        const stonesOnBoard = this.positionDicesOnBoard();
        return (
            <div className="game-container">
                {this.renderDiceRoller()}
                <Button
                    color="white"
                    primary={true}
                    label="Back"
                    onClick={this.props.goBack}
                    style={{ position: 'absolute', left: '14px', top: '14px' }}
                />


                {this.renderUnmovedStones('b')}
                <SvgBoard
                    onSquareClick={this.onSquareClick.bind(this)}
                    setRef={(c, name) => {

                        this[name] = c
                    }}
                />

                {stonesOnBoard}

                {this.renderUnmovedStones('w')}

            </div>
        );
    }
}

export default Game;
