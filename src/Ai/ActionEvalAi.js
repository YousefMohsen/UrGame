/**
 * Gudea is an improvment of the expectimax AI Gilgamesh.
 *
 */

var fs = require("fs");
function writeToJSON(data) {
    fs.writeFile(
        "./src/Ai/generatedTree.json",
        JSON.stringify(data),
        { flag: "w" },
        function (err) {
            if (err) {
                console.log(err);
            }
            console.log("File Saved!");
        }
    );
}
class ActionEvalAI {
    constructor(depth, color) {
        this.depth = depth;
        this.color = color || "b"; // AI stone color
    }

    calculateMove(state) {
        //returns null if no possible moves
        const searchDepth = this.depth; //2;
        const tree = buildTree(state, searchDepth, this.color);
        //console.log('tree',tree)
        //console.log('tree',tree.root.children);
        //  writeToJSON(tree)
        //console.log('tree.root.type',tree.root.nodeType)
        // tree.root.children.map((c,i)=>console.log('m',c.move,'value: ',c.value))
        //console.log('aiplayer',state.currentPlayer)
        const max =
            tree.root.children && tree.root.children.length > 0
                ? tree.root.children.reduce((prev, current) =>
                    prev.value > current.value ? prev : current
                )
                : null;
        return max ? max.move : null;
        /*
            console.log('in GudeaAI calcMove', state);
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

module.exports = ActionEvalAI;
//export default GudeaAI;

//import GameSimulator from './GameSimulator';
const GameSimulator = require("./Tools/GameSimulator");
const gameSimulator = new GameSimulator();

const IS_Terminal_NODE = "IS_Terminal_NODE";
const IS_MAX_NODE = "IS_MAX_NODE";
const IS_MIN_NODE = "IS_MIN_NODE";
const IS_CHANCE_NODE = "IS_CHANCE_NODE";

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

function boardUtility(state, aiColor) {
    //console.log('ai color')
    //utilityValues
    const ut = {
        v1: 0.2,
        v2: 0.4,
        v3: 0.6,
        v4: 0.8,
        v5: 1.0
    };
    let utility = 0.0;
    const board = state.board;
    const enemyColor = aiColor === "b" ? "w" : "b";
    for (let index = 0; index < board.length; index++) {
        const playerStones = board[index][aiColor];
        const enemyStones = board[index][enemyColor];
        //divide to war zones /safe zones

        if (index === 0) {//not on board
            if (enemyStones) {//good if enemy has stones off board
                utility += enemyStones * ut.v1;
            }
            if (playerStones) {//bad of player have stones off board
                utility -= playerStones * ut.v1;
            }
        }
        if (index > 12) {//safe zone
            if (playerStones) {//good if player stones can make it to end safe zone
                utility += playerStones * ut.v1;
            }
            if (enemyStones) {//good if player stones can make it to end safe zone
                utility -= playerStones * ut.v1;
            }
        }

        if (playerStones > 0) {//extra turns
            // console.log('playerStones',playerStones)
            if (index === 4 || index === 3) {
                //squares 3 and 4 are tactical good if enemy has many square at index<5
                utility += ut.v2;
            }
            if (index === 8) {
                //keep square 8
                utility += ut.v2;
            }
            if (index === 4 || index === 8 || index === 14) {
                //extra turns
                utility += ut.v2;
            }
        }
        if (index > 4 && index < 13) {
            //this is the war zone
            //be offensive
            //keep square 8
            //kill is better than moving a secure stone
            if (playerStones) {
                //avoid danger
                const enemyOneBehind = board[index - 1][enemyColor]; //number of enemy stones on the square behinde
                const enemyTwoBehind = board[index - 2][enemyColor]; //number of enemy stones on the #2 square behinde
                utility -= enemyOneBehind * ut.v1 + enemyTwoBehind * ut.v1;

                utility += ut.v2

            }
            if (enemyStones) {
                //own stone before enemy stones in danger area
                const playerStoneOneBehind = board[index - 1][aiColor]; //number of own stones on the square behinde
                const playerStoneTwoBehind = board[index - 2][aiColor]; //number of own stones on the #2 square behinde
                //utility += playerStoneOneBehind * ut.v1*getProbability(1) + playerStoneTwoBehind * ut.v1*getProbability(2);
                utility += playerStoneOneBehind * ut.v1 * getProbability(1) + playerStoneTwoBehind * ut.v1 * getProbability(2);

                //better if no enemy
                utility -= (8 - (13 - index))
                //betetr if enemy has feve stones    

            }
        }
    }
    //console.log(utility)
    return utility;
}
function utility(state, moveFrom, aiColor) {
    if (state && moveFrom) {

        // move= {0: '4'
        const moveTo = state.possibleMoves[moveFrom];
        // console.log('state.moveFrom',moveFrom)
        //console.log('state.moveTo',moveTo)

        const board = state.board;
        const enemy = aiColor === "w" ? "b" : "w";
        //console.log('player',player)
        // console.log('enemy',enemy)

        //
        // Utility(s, p): utility function (or payoff function). Numerica value for player p in ter
        let utility = 0.1;

        //console.log('this.color', state.board[0][this.color])

        if (board[0][aiColor] === 7) {
            // console.log('inUtility.state', state);
            // console.log('movefrom, moveTo', moveFrom, moveTo)
            // console.log('\n\n\n\n')
            // console.log('in board[moveFrom][aiColor]==1!!!')
            // We aren't on the board yet, and it's always nice to add more to the board to open up more options.
            //    utility += 0.2;
        }
        if (moveFrom === "8" || moveFrom === 8) {
            // We are sitting on a roll-again space in the middle.  Let's resist moving just because
            // it blocks the space from our opponent
            utility -= 0.6;
        }
        if (moveTo === 8) {
            //if extra turn stones
            //console.log('moveto==8')
            utility += 1.3;
        }
        if (moveTo === 4) {
            //if extra turn stones
            utility += 0.8;
        }
        if (moveTo === 14) {
            //if extra turn stones
            utility += 0.3;
        }
        // console.log('board[moveTo][enemy]',board[moveTo][enemy]);
        if (board[moveTo][enemy] === 1) {
            //if enemhy stone on moveto square
            utility += 1.9;
        }

        if (moveTo === 15) {
            //   console.log('moveto==15')
            //if finish square //TODO: only add extra points if stone is in danger
            utility += 0.4;
        }
        if (state.currentPlayer === enemy) {
            return (utility = -1 * utility);
        }
        /*
        
        
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
    } else {
        console.log("\nERRORRR!!\nmoveFrom, state\n", moveFrom, "\n", state);
        return null;
        /*
                import fs = require('fs');
            
            fs.writeFile('./src/Ai/log.json', JSON.stringify({moveFrom: moveFrom, state: state}), { flag: 'w' }, function(err) {
                if (err) {
                    console.log(err);
                }
                console.log('File Saved!');
            
            });
                console.log('state &&moveFrom is false',moveFrom, state)*/
    }
}


class Node {
    constructor({ gameState, parent, maxDepth, probability, move, playerColor }) {
        this.playerColor = playerColor;
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
            this.parent.gameState.currentPlayer === enemy &&
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
                //const ut =  this.playerColor === this.gameState.currentPlayer ? utility(this.parent.gameState, this.move,this.playerColor) : boardUtility(this.gameState, this.playerColor); //move: move from parent,
                const ut = utility(this.parent.gameState, this.move, this.playerColor);
                //  const ut = boardUtility(this.gameState, this.playerColor);
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
                return this.maxValue(); // + (this.parent.gameState ? utility(this.parent.gameState, this.move) : 0);
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
                        //parentDepth: this.depth,
                        maxDepth: this.maxDepth,
                        playerColor: this.playerColor,
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
                            playerColor: this.playerColor,
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
    constructor(rootState, maxDepth, playerColor) {
        let node = {
            playerColor: playerColor,
            gameState: rootState,
            parent: null,
            // parentDepth: 0,
            maxDepth: maxDepth,
            probability: 1
        };
        const rootNode = new Node(node);
        this.root = rootNode;
    }
}

function buildTree(gameState, maxDepth, playerColor) {
    return new Tree(gameState, maxDepth, playerColor);
}

//module.exports = buildTree;
//export default buildTree;
