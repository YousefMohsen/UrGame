const Ur = require('../GameEngine');
const GameSimulator = require('./Tools/GameSimulator')
const GilgameshAI = require('./GilgameshAI');
const buildTree = require('./Tools/Tree');
const AI = new GilgameshAI();
var util = require('util')
/*
const initState = { currentPlayer: 'b',
dice: [ 0, 1, 2, 0 ],
diceResult: 2,
possibleMoves: { '0': 1, '2': 3 },
board: 
 [ { w: 4, b: 6 },
   { w: 0, b: 0 },
   { w: 1, b: 0 },
   { w: 0, b: 0 },
   { w: 1, b: 0 },//#4 holy
   { w: 0, b: 0 },
   { w: 0, b: 1 },
   { w: 1, b: 0 },
   { w: 0, b: 0 },
   { w: 0, b: 0 },
   { w: 0, b: 0 },
   { w: 0, b: 0 },
   { w: 0, b: 0 },
   { w: 0, b: 0 },
   { w: 0, b: 0 },
   { w: 0, b: 0 } ] } //# 15 scoring stone
*/
// Ur(stones?: number, dice?: number, player?: string)
//const game = new Ur(7,4,Ur.BLACK);
// default: stones = 7, dice = 4, player = Ur.WHITE
const gameSimulator = new GameSimulator();
//let state = game.getState();
//console.log(JSON.stringify(state))
//state =game.takeTurn(state.currentPlayer,0) 
//state =game.takeTurn(state.currentPlayer,0) 

let initState = require('./initState.json');
//console.log('firststate',initState)


// takeTurn(state: Object, player: string, move?: string | number)
//state =game.takeTurn(state.currentPlayer,0) 
//state =game.takeTurn(state.currentPlayer,0) 
//console.log('state1',state)
//let possibleState  = gameSimulator.getPossibleState(state,state.currentPlayer,0,4);

//console.log('possibleState',possibleState)




const tree = buildTree(initState,2)
//console.log('tree',tree)
var fs = require('fs');

fs.writeFile('./src/Ai/generatedTree.json', JSON.stringify(tree), { flag: 'w' }, function(err) {
    if (err) {
        console.log(err);
    }
    console.log('File Saved!');

});
//console.log('tree',util.inspect(tree))


//printChildren(tree.root)

function printChildren(node){
    node.children.map((child,i)=>{
        console.log('\n\nchild', i,'of ',node.depth,child.gameState,'\n\n')
        printChildren(child);
    });
}
// returns false on invalid input, new state otherwise
// move is allowed to be undefined should there be no possible move

// voidTurn(state: Objecct, player: string)
//let aiMove = AI.calculateMove(state);

//state =  game.voidTurn( Ur.BLACK);
// returns false when not the current player is input, new state otherwise
// useful for ending turns after a certain amount of time

//console.log('state',state,'aiMove',aiMove)
// possible state:
// state.currentPlayer -> 'w'
// state.diceResult -> 3
// state.possibleMoves -> { '0': 3 }
//console.log('s0state',state);
//console.log('\ntate.diceResult',state.diceResult,'\n')
/*let lopX = 0;
while(!state.winner){
    lopX++;

    if(!state.possibleMoves){
        console.log('\nDidnt find any possibleMoves!',state.possibleMoves,'\n')
    }
    const rand = Math.floor(Math.random() * Object.keys(state.possibleMoves).length);

    
    state =game.takeTurn(state.currentPlayer,Object.keys(state.possibleMoves)[rand]) 
    
    // or game.takeTurn('w', 0);
    console.log('\nstate',state);

}*/
//console.log('state.possibleMoves',console.log(Object.keys(state.possibleMoves)[0] ) )
// takeTurn(player: string, move?: string | number)
// returns false on invalid input
// returns new state otherwise
// move is allowed to be undefined should there be no possible move
//console.log('\number og loops',lopX);


// voidTurn(player: string)
//game.voidTurn(Ur.BLACK);
// returns false when not the current player is input, new state otherwise
// useful for ending turns after a certain amount of time




