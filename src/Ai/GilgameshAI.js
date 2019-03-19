/**
 * Gilgamesh is an utility AI, that picks the stone with the highest utility. 
 * This AI only looks at one move ahead.
 */
//export default
const Tree = require('./Tools/Tree');

class GilgameshAI {
    constructor() {
        this.color = 'b'; //assumme AI always plays with black stones. TODO: More dynamically.
    }

    calculateMove(state) {
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

        })
        return 0;
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


     expectiMiniMax(){
//if the state is terminal, return state
//if the next agent is Max, return max-value
//if thee next agent is Min, return min-value
}    

    utility(state, stonePosition) {

        //
        // Utility(s, p): utility function (or payoff function). Numerica value for player p in ter
        let utility = 0;

        console.log('inUtility.state', state);
        console.log('stonePosition', stonePosition)
        console.log('this.color', state.board[0][this.color])


        if (state.board[0][this.color] === 7) {
            // We aren't on the board yet, and it's always nice to add more to the board to open up more options.
            utility += 0.20;
        }
        /*
    
        if( currentTile != null && (currentTile.IsRollAgain == true && currentTile.IsSideline == false) )
        {
            // We are sitting on a roll-again space in the middle.  Let's resist moving just because
            // it blocks the space from our opponent
            utility -= 0.10;
        }
    
        if( futureTile.IsRollAgain == true )
        {
            utility += 0.50;
        }
    
        if( futureTile.PlayerStone != null && futureTile.PlayerStone.PlayerId != stone.PlayerId )
        {
            // There's an enemy stone to bop!
            utility += 0.50;
        }
    
        if( futureTile.IsScoringSpace == true )
        {
            utility += 0.50;
        }
    
       /* let currentDanger = 0;
        if(currentTile != null)
        {
            currentDanger = tileDanger[currentTile];
        }
    
        utility -= currentDanger ;
    */
        // TODO:  Add goodness for tiles that are behind enemies, and therefore likely to contribute to future boppage
        // TODO:  Add goodness for moving a stone forward when we might be blocking friendlies

        return utility;

    }



    isWiningState(state){
        //returnd true if state is a wining state
    }
}

module.exports = GilgameshAI;


