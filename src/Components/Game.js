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
            selectedStone: ''
        }

        this.ai= new RandomAI();
        
    }
    componentDidMount() {
        if (!this.gameEngine) {
            this.gameEngine = new GameEngine;
            let state = this.gameEngine.getState();
            const rand = Math.floor(Math.random() * Object.keys(state.possibleMoves).length);
            state = this.gameEngine.takeTurn(state.currentPlayer, Object.keys(state.possibleMoves)[rand])
            this.setState({ gameState: state });
            state = this.gameEngine.takeTurn(state.currentPlayer, Object.keys(state.possibleMoves)[rand])
            this.setState({ gameState: state });
            state = this.gameEngine.takeTurn(state.currentPlayer, Object.keys(state.possibleMoves)[rand])
            this.setState({ gameState: state });


            console.log('state,', state)
        }
        setTimeout(() => {
            //  this.moveStoneToSquare(WHITE, 0, 1);
        }, 2000)

        //    document.addEventListener('mousemove', (e)=>console.log('e',e));
console.log('this',this)
    }
    player(s) {
        //  who has the move in s.

    }
    moveStoneToSquare(color, from, to) {
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
    }
    renderUnmovedStones(color) {
        //  console.log(color + "-stone.png")
        if (this.state.gameState) {
            console.log(' this.state.gameState', this.state.gameState.board)
            const stonesCount = this.state.gameState.board[0][color]
            let stones = [];
            for (let i = 0; i < stonesCount; i++) {
                stones.push(<img onClick={() => console.log(color + '-stone')} src={color + "-stone.png"} style={{ marginRight: '2px', width: '50px', height: '50px' }} className={(this.state.humanData.stoneColor === color && this.state.selectedStone === 0 && i === 0 ? " stone-glow" : "")} />)
            }
            return (
                <div style={{ display: 'flex' }} onClick={() => { if (color === WHITE) this.selectStone(0) }}>
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
                <p></p>
            </div>
        )
    }
    rollDice() {//dice are rolled in gameengine. Show dice first when user clicks roll dice 
        /*
        const roll = Math.floor(Math.random() * 5);
        this.setState({ gameState: { ...this.state.gameState, diceResult: roll } })
        //TODO: update game state*/
        const rand = Math.floor(Math.random() * Object.keys(this.state.gameState.possibleMoves).length);

        const state = this.gameEngine.takeTurn(this.state.gameState.currentPlayer, Object.keys(this.state.gameState.possibleMoves)[rand])
        this.setState({ gameState: state });

    }
    selectStone(position) {//UI only action
        if (this.state.selectedStone === position) {
            this.setState({ selectedStone: null });
        } else {
            this.setState({ selectedStone: position });
        }

    }
    onSquareClick(square) {
        console.log('square', square)
    }


    positionDicesOnBoard() {
        let stonesOnBoard = [];

        if (this.state.gameState && this.state.gameState.board) {



            const board = Object.values(this.state.gameState.board);

            board.map((field, index) => {
                if (index !== 0 && index !== 15) {

                    if (field.w > 0) {

                        const positionReference = index<=4 || index>= 13 ?  'w' + index : index;
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
                        const positionReference = index<=4 || index>= 13 ?  'b' + index : index;
                        console.log('positionReference ',positionReference)

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
        console.log('this', this)
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
