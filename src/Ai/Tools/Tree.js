//import GameSimulator from './GameSimulator';
const GameSimulator = require("./GameSimulator");
const gameSimulator = new GameSimulator();

const IS_Terminal_NODE = "IS_Terminal_NODE";
const IS_MAX_NODE = "IS_MAX_NODE";
const IS_MIN_NODE = "IS_MIN_NODE";
const IS_CHANCE_NODE = "IS_CHANCE_NODE";


function expectiminiMax() {


}


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
        default:
            return 0;
    }
}

function boardUtility(state, aiColor="b" ) {
    //console.log('ai color')
    let utility = 0.0;
    const board = state.board;
    const enemyColor = aiColor === "b" ? "w" : "b"
    board.map((square, index) => {
        if(index>0){
            if (square[aiColor] > 0) {

                utility += 15-(9-index);
            }
            if (square[enemyColor] > 0 ) {
                utility -=  15-(9-index);
            }
        }

    });


    if (board[8][aiColor]) {
        utility += 0.8;
    }
    if (board[14][aiColor]) {
        utility += 0.3;
    }
    if (board[4][aiColor]) {
        utility += 0.5;
    }
    if (board[8][enemyColor]) {
      //  utility -= 0.3;
    }


   // console.log('boardUtility', utility)
    //console.log('state', state)
    return utility;
}


class Node {
    constructor({ gameState, parent, maxDepth, probability, move ,playerColor}) {
        this.playerColor =playerColor;
        this.gameState = gameState;
        this.parent = { ...parent }; //todo: remove spread
        this.depth = parent ? parent.depth + 1 : 0; //parentDepth + 1
        this.maxDepth = maxDepth;
        this.probability = probability || 1;
        this.nodeType = this.nodeType ? this.nodeType : this.getNodeType();
        this.children = this.calculateChildren();
        if (this.children.length === 0) this.nodeType = IS_Terminal_NODE; //make this prettier

        this.move = move;
        this.value = this.getValue();
        //console.log('got value',this.value)

        //console.log('this.nodeType', this.nodeType)
        if (this.utility) {
            //console.log('util', this.value)
            //this.utility =
        }
        // console.log('util', this.utility)

        //  this.value = this.getValue();
        // this.utility = this.utility ? this.utility  : (this.children[0] ? this.children[0].utility : -1);
        //  this.utility = this.children.length>0 ? 'get from childrend' : 'evaluation'
        // console.log('node constructo depth,', parentDepth)
    }

    getNodeType() {

        const enemy = this.playerColor === "b" ? "w" : "b";
        if (this.nodeType) {
          // console.log('in this.nodeType',this.nodeType)
          return this.nodeType;
        } else if (!this.parent) {
          return IS_MAX_NODE;
        } else if (
          this.gameState.currentPlayer === enemy &&
          this.parent.gameState&&   this.parent.gameState.currentPlayer === enemy &&
          this.parent.nodeType === IS_CHANCE_NODE
        ) {
          return IS_MIN_NODE;
        } else if (this.gameState.currentPlayer === enemy) {
          return IS_CHANCE_NODE;
        } else {
          return IS_MAX_NODE;
        }
      }
    getValue() {
        //let v;

        switch (this.nodeType) {
            case IS_Terminal_NODE:
                ///terminal or maxdepth reached
                //const ut =  utility(this.parent.gameState, this.move)  //move: move from parent,

                const ut = boardUtility(this.gameState);
                // const ut = boardUtilityCompare(this.gameState,this.parent.gameState);

                //
                //  console.log('in else this.maxDepth >= this.depth ,this. ',  this.gameState.possibleMoves)
                // console.log('ut',ut)
                if (!ut) {
                    //     console.log('ut i null, this.node',this.nodeType,'posiblemove',this.gameState.possibleMoves)
                }
                return ut;
            //this.utility = ut;
            //  console.log('ut',ut)
            // console.log('this.utility',this.utility)
            //  return this.utility

            case IS_MAX_NODE:
                return this.maxValue()// + (this.parent.gameState ? utility(this.parent.gameState, this.move) : 0);
            case IS_MIN_NODE:
                return this.minValue();

            case IS_CHANCE_NODE:
                return this.expValue();

            default:
                return 0;
        }
        //values = [value(s) for s in sucessors(s)]
        //weghts
    }
    maxValue(state) {
        //values = [value(s) for s in sucessors(s)]
        //console.log('this',this)
        const max = this.children.reduce((prev, current) =>
            prev.value > current.value ? prev : current
        );
        // console.log('found max in children',max.value);
        // console.log('children: \n');
        /* this.children.map(child => {
               //  console.log('child', child.utility)
                 //v += child.probability *child.value;
             })*/
        // return max(values)
        return max.value;
    }
    minValue(state) {
        const min = this.children.reduce((prev, current) =>
            prev.value < current.value ? prev : current
        );

        return min.value;
    }

    expValue() {
        let v = 0;
        this.children.map(child => {
            //   console.log('child.value',child.value)
            v += child.probability * child.value;
        });
        // const ut = utility(this.parent.gameState, this.move);//move: move from parent,

        //  console.log('expValue',v)
        return v;
        //values = [value(s) for s in sucessors(s)]
        //weghts
    }

    calculateChildren() {
        if (this.maxDepth > this.depth && this.gameState) {
            // find children if node is non terminal and maxDepth is not reached !this.gameState.winner
            const possibleMoves = this.gameState
                ? Object.keys(this.gameState.possibleMoves)
                : [];
            //console.log(   Object.keys(this.gameState.possibleMoves))

            let children = [];

            if (this.nodeType === IS_MAX_NODE || this.nodeType === IS_MIN_NODE) {
                //
                //  console.log('calculateChildren this.type,', this.nodeType)
                //only possiblemove
                possibleMoves.map(move => {
                    // console.log('in movemap',move)
                    //applyMove
                    //  console.log('this.game.state',this.gameState)
                    //  console.log('in for loop!')
                    //console.log('probability')
                    //    console.log('this.gameState',this)
                    let childState = gameSimulator.getPossibleState(
                        this.gameState,
                        this.gameState.currentPlayer,
                        move,
                        1
                    );
                    // console.log('childState',childState)
                    let newNode = {
                        gameState: childState,
                        parent: this,
                        playerColor: this.playerColor,
                        //parentDepth: this.depth,
                        maxDepth: this.maxDepth,
                        // probability: probability,
                        //utility: utility(this.gameState,move) ||0,
                        move: move
                    };

                    if (childState) children.push(new Node(newNode));
                });
            } else if (this.nodeType === IS_CHANCE_NODE) {
                possibleMoves.map(move => {
                    // console.log('in movemap',move)
                    //applyMove
                    //  console.log('this.game.state',this.gameState)
                    var i;
                    for (i = 0; i < 5; i++) {
                        //  console.log('in for loop!')
                        const probability = getProbability(i);
                        //console.log('probability')
                        //    console.log('this.gameState',this)
                        let childState = gameSimulator.getPossibleState(
                            this.gameState,
                            this.gameState.currentPlayer,
                            move,
                            i
                        );
                        childState.currentPlayer = this.gameState.currentPlayer;
                        // console.log('childState',childState)
                        let newNode = {
                            gameState: childState,
                            parent: this,
                            //parentDepth: this.depth,
                            playerColor:this.playerColor,
                            maxDepth: this.maxDepth,
                            probability: probability,
                            //utility: utility(this.gameState,move) ||0,
                            move: move
                        };

                        if (childState) children.push(new Node(newNode));
                    }
                });
            }

            return children;
        } else {
            this.nodeType = IS_Terminal_NODE;
            /*//terminal or maxdepth reached
                  const ut = utility(this.parent.gameState, this.move);//move: move from parent,
                  //  console.log('in else this.maxDepth >= this.depth ,this. ',  this.gameState.possibleMoves)
      
                  this.utility = ut;
                  //  console.log('ut',ut)*/
        }
        //console.log('maxdepth reached',this.depth)
        return [];
    }
}

class Tree {
    constructor(rootState, maxDepth,playerColor) {
        let node = {
            gameState: rootState,
            parent: null,
            // parentDepth: 0,
            maxDepth: maxDepth,
            probability: 1,
            playerColor:playerColor
        };
        const rootNode = new Node(node);
        this.root = rootNode;
    }
}

function buildTree(gameState, maxDepth, playerColor) {
    return new Tree(gameState, maxDepth,playerColor);
}

module.exports = buildTree;
//export default buildTree;
