const GameSimulator = require('./GameSimulator');
const gameSimulator = new GameSimulator()

function getProbability(diceRoll) {

    switch (diceRoll) {
        case 0:
            return 1 / 16;
        case 1:
            return 4 / 16;
        case 2:
            return 6 / 16;
        case 3:
            return 4 / 16;
        case 4:
            return 1 / 16;
    }
}

function utility(state, moveFrom) {
    // move= {0: '4'
const moveTo = state.possibleMoves[moveFrom];
const board = state.board;
const player ='b';//todo
//
    // Utility(s, p): utility function (or payoff function). Numerica value for player p in ter
    let utility = 0.1;



    //console.log('this.color', state.board[0][this.color])

    if (board[0][player] === 7) {
        console.log('inUtility.state', state);
        console.log('movefrom, moveTo', moveFrom,moveTo)
        console.log('\n\n\n\n')
        console.log('in board[moveFrom][player]==1!!!')
        // We aren't on the board yet, and it's always nice to add more to the board to open up more options.
        utility += 0.20;
    }
    if(moveFrom ==='8')
    {

        // We are sitting on a roll-again space in the middle.  Let's resist moving just because
        // it blocks the space from our opponent
        utility -= 0.10;
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


class Node {
    constructor({ gameState, parent, maxDepth, probability }) {

        this.gameState = gameState;
        this.parent = {...parent};//todo: remove spread
        this.depth = parent ? parent.depth + 1 : 0;//parentDepth + 1
        this.maxDepth = maxDepth;
        this.probability = probability || 1;
        this.children = this.calculateChildren();
      //  this.utility = this.children.length>0 ? 'get from childrend' : 'evaluation'
       // console.log('node constructo depth,', parentDepth)


    }

macValue(state){
    //values = [value(s) for s in sucessors(s)]

    // return max(values)
}

expValue(){
    //values = [value(s) for s in sucessors(s)]
    //weghts 
}


    calculateChildren() {
        // console.log('calculateChildren this.maxdepth,', this.maxDepth)
        if (this.maxDepth >= this.depth && this.gameState) {// find children if node is non terminal and maxDepth is not reached !this.gameState.winner
            const possibleMoves = this.gameState ? Object.keys(this.gameState.possibleMoves) : [];
            //console.log(   Object.keys(this.gameState.possibleMoves))

            let children = [];
            possibleMoves.map(move => {
                   // console.log('in movemap',move)
                //applyMove
                //  console.log('this.game.state',this.gameState)
                var i;
                for (i = 0; i < 5; i++) {
                    //  console.log('in for loop!')
                    const probability = getProbability(i);

                    //    console.log('this.gameState',this)
                    let childState = gameSimulator.getPossibleState(this.gameState, this.gameState.currentPlayer, move, i);
                    // console.log('childState',childState)
                    let newNode = {
                        gameState:childState, 
                        parent:this, 
                        //parentDepth: this.depth, 
                        maxDepth: this.maxDepth, 
                        probability:probability,
                        utility: utility(this.gameState,move) ||0
                    }



                    if (childState) children.push(new Node(newNode))
                }

            })
            return children;

        }
        else {
         //  console.log('in else this.maxDepth >= this.depth ,this. ',  this.gameState.possibleMoves)
        }
        //console.log('maxdepth reached',this.depth)
        return [];
    }

}

class Tree {
    constructor(rootState, maxDepth) {
        let node = {
            gameState:rootState, 
            parent:null, 
          // parentDepth: 0, 
            maxDepth: maxDepth, 
            probability:1
        }
        const rootNode = new Node(node);
        this.root = rootNode;
    }

}

function buildTree(gameState, maxDepth) {
   
    return  new Tree(gameState, maxDepth);

}

module.exports = buildTree;