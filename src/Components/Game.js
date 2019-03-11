import React, { Component } from 'react';
import { Button, Heading } from 'grommet';
import { Icons } from 'grommet-icons';
import GilgameshAI from '../Ai/GilgameshAI'
import './Game.css'
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

const WHITE ='w';
const BLACK = 'b'

const AI = new GilgameshAI();
class Game extends Component {

    constructor() {
        super();
        this.state = {
            gameState: { ...initialState },
            humanData:{
            stoneColor:WHITE,
            name:'Messi'
            },
            selectedStone:''
        }

        this.UIBoardPositions={
            'w1':'',
        }
    }
componentDidMount(){
    setTimeout(()=>{
        this.moveStoneToSquare(WHITE,0,1);
    },2000)

//    document.addEventListener('mousemove', (e)=>console.log('e',e));

}
    player(s) {
        //  who has the move in s.

    }
    moveStoneToSquare(color,from,to){
     let board =   this.state.gameState.board;
     const otherColor = color===WHITE ? BLACK : WHITE;
     board[from][color]--;
     if(board[to][otherColor]===1){//if opponent has a stone
         board[to][otherColor]=0;
         board[0][otherColor]++;
    }
     board[to][color] =1
     console.log('Board',board)

     this.setState({gameState:{...this.state.gameState, board} })
    }
    renderUnmovedStones(color) {
        console.log(color+"-stone.png")
        const stonesCount = this.state.gameState.board[0][color];
        let stones = [];
        for (let i = 0; i < stonesCount; i++) {
            stones.push(<img src={color+"-stone.png"} style={{ marginRight: '2px', width:'50px', height:'50px' }} className={(this.state.humanData.stoneColor===color&& this.state.selectedStone===0&&i===0 ?" stone-glow":"")}/>)
        }
        return (
            <div style={{ display: 'flex' }} onClick={()=>{if(color===WHITE)this.selectStone(0)}}>
                {stones}
            </div>
        )
    }
    renderDiceRoller(){
        return(
        <div style={{ position: 'absolute', right: '20px', top: '25px' }}>
         <Button
        color="white"
        primary={true}
        label="Roll dice"
        onClick={this.rollDice}
        />
        <h2>{this.state.gameState.diceResult}</h2>
        <p></p>
            </div>
        )
    }
selectStone(position){//UI only action
  if(this.state.selectedStone===position){
    this.setState({selectedStone:null});

  }else{
    this.setState({selectedStone:position});
  }  

}
    renderBoard(){
    const board = this.state.gameState.board;
        let stonesOnBoard = [];
    /*board.map((field,index)=>{

        if(index>5){
                
        }
    })*/
    const square = this['w1'] ? this['w1'].getBoundingClientRect() : false;
    //console.log('position',position)
    if(square){
        console.log('square',square)
        const position = {
            top:square.y+'px',
            left: square.x+'px',
        }
        console.log('elPosition',position)

        stonesOnBoard.push(<img src={"w-stone.png"} style={{ ...position, position:'absolute', width:'50px', height:'50px' }} />)

    }

        return(
<React.Fragment>
    {stonesOnBoard}
<div>
  <img src="board.png" useMap="#image-map" />
  <map name="image-map">
    <area  ref={(c) => this['w1'] = c} target alt="w1" title="w1" coords="387,313,315,244" shape="rect" onClick={()=>console.log('w1')} />
    <area target alt="w2" title="w2" href coords="295,317,219,243" shape="rect" onClick={()=>console.log('w2')}/>
  </map>
</div>

</React.Fragment>

        )
    }
    render() {
        console.log('this',this)
    


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
            {this.renderBoard()}

                {this.renderUnmovedStones('w')}

            </div>
        );
    }
}

export default Game;
