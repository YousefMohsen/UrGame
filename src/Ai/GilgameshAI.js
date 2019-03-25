/**
 * Gilgamesh is an utility AI, that picks the stone with the highest utility. 
 * This AI only looks at one move ahead.
 */
//export default
//const Tree = require('./Tools/Tree');
const buildTree = require('./Tools/Tree');
var fs = require('fs');
function writeToJSON(data){
    fs.writeFile('./src/Ai/generatedTree.json', JSON.stringify(data), { flag: 'w' }, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('File Saved!');
    
    });
}
//import buildTree from './Tools/Tree';
class GilgameshAI {
    constructor(depth) {
        this.depth = depth;
     //   this.color = 'b'; //assumme AI always plays with black stones. TODO: More dynamically.
    }

    calculateMove(state) {
        const searchDepth = this.depth;//2;
        const tree = buildTree(state, searchDepth)
        //console.log('tree',tree)
        //console.log('tree',tree.root.children);
       // writeToJSON(tree)
//console.log('tree.root.type',tree.root.nodeType)
       // tree.root.children.map((c,i)=>console.log('m',c.move,'value: ',c.value))
        //console.log('aiplayer',state.currentPlayer)
        const max = tree.root.children.reduce((prev, current) => (prev.value > current.value) ? prev : current);
        return max.move;
        /*
        console.log('in gilgamesh calcMove', state);
        const possibleMoves = Object.keys(state.possibleMoves) || [];
        console.log('possibleMoves', possibleMoves)
        let bestUtility;
        let stoneToMove;
        possibleMoves.map((key) => {
            console.log('key', key);
            let utility = this.utility(state, key);
            if (utility > bestUtility) {
                stoneToMove = key;
                bestUtility = utility;
            }

        })*/
        // return 0;
    }


    actions(s) {
        //Actions(s): Legal moves in s.

    }
    terminalTest(s) {
        ///• Terminal-Test(s): terminal test. Is the game over?

    }
    results(s, a) {
        // • Result(s, a): transition model.

    }
    /*
    { currentPlayer: 'w',
      dice: [ 0, 1, 0, 1 ],
      diceResult: 2,
      possibleMoves: { '0': 2 },
      board: 
       [ { w: 7, b: 7 },
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
         { w: 0, b: 0 } ] }*/


    expectiMiniMax() {
        //if the state is terminal, return state
        //if the next agent is Max, return max-value
        //if thee next agent is Min, return min-value
    }





    isWiningState(state) {
        //returnd true if state is a wining state
    }
}

module.exports = GilgameshAI;
//export default GilgameshAI;

