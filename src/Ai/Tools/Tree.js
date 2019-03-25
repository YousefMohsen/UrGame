//import GameSimulator from './GameSimulator';
const GameSimulator = require("./GameSimulator");
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

function boardUtility(state, aiColor = "b") {
  //console.log('ai color')
  let utility = 0.1;
  const board = state.board;
  board.map((square, index) => {
    if (square[aiColor] > 0 && index > 0) {
      utility += square[aiColor] * (index / 20);
    }
  });
  if (board[8][aiColor]) {
    utility += 0.8;
  }
  if (board[4][aiColor]) {
    utility += 0.4;
  }

  //console.log('utility',utility)
return utility;
}
function boardUtilityCompare(state,parentState,aiColor = "b") {
    //console.log('ai color')
    let utility = 0.1;
    const board = state.board;
    const parentBoard = parentState.board;
    const enemyColor = aiColor === "b" ? "w":"b";
    for (let index = 1; index < board.length; index++) {
        let parentSquare = parentBoard[index];
        let boardSquare = board[index]
     //   console.log('boardSquare',boardSquare)
        if (boardSquare[aiColor] > 0  && (parentSquare[aiColor] === 0) ) {
            if(index>4 &&index<13){
                utility +=  (index / 13);

            }
         
        if(index===8){
            utility+=0.8;
        }
        if(parentSquare[enemyColor]>0&&index>4&&index<13){
            utility+=0.9;

        }
        
    }


       /*   if (board[index][aiColor]>0 &&parentBoard[index][enemyColor]>0 &&index>4&&index<15) {//if landed on enemy piece
            utility += 1.1;
          }*/

    }

/*    if (board[8][aiColor]>0 &&parentBoard[8][aiColor]===0 ) {//if landed on extra turn square
      utility += 0.7;
    }*/
    //console.log('utility',utility)
  return utility;
  }
function utility(state, moveFrom) {
  if (state && moveFrom) {
      
    // move= {0: '4'
    const moveTo = state.possibleMoves[moveFrom];
    // console.log('state.moveFrom',moveFrom)
    //console.log('state.moveTo',moveTo)

    const board = state.board;
    const player = state.currentPlayer; // 'b';//todo
    const enemy = player === "w" ? "b" : "w";
    //console.log('player',player)
    // console.log('enemy',enemy)

    //
    // Utility(s, p): utility function (or payoff function). Numerica value for player p in ter
    let utility = 0.1;

    //console.log('this.color', state.board[0][this.color])

    if (board[0][player] === 7) {
      // console.log('inUtility.state', state);
      // console.log('movefrom, moveTo', moveFrom, moveTo)
      // console.log('\n\n\n\n')
      // console.log('in board[moveFrom][player]==1!!!')
      // We aren't on the board yet, and it's always nice to add more to the board to open up more options.
    //    utility += 0.2;
    }
    if (moveFrom === "8"|| moveFrom ===8) {
      // We are sitting on a roll-again space in the middle.  Let's resist moving just because
      // it blocks the space from our opponent
      utility -= 0.6;
    }
    if (moveTo === 8 ) {
      //if extra turn stones
      //console.log('moveto==8')
      utility += 1.3;
    }
    if (moveTo === 4 ) {
        //if extra turn stones
        utility += 0.8;
      }
      if ( moveTo === 14) {
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
    if (state.currentPlayer === "w") {
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
  constructor({ gameState, parent, maxDepth, probability, move }) {
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
    if (this.nodeType) {
      // console.log('in this.nodeType',this.nodeType)
      return this.nodeType;
    } else if (!this.parent) {
      return IS_MAX_NODE;
    } 
    else if (
      this.gameState.currentPlayer === "w" &&
      this.parent.gameState.currentPlayer === "w"&&
      this.parent.nodeType === IS_CHANCE_NODE
    ) {
      return IS_MIN_NODE;
    } else if (this.gameState.currentPlayer === "w") {
      //.nodeType === IS_MAX_NODE //white
      return IS_CHANCE_NODE;
    } else {
      //if im === w && parent ==w then
      /** */
      return IS_MAX_NODE;
    }
  }
  getValue() {
    //let v;

    switch (this.nodeType) {
      case IS_Terminal_NODE:
        ///terminal or maxdepth reached
         //const ut = utility(this.parent.gameState, this.move); //move: move from parent,

        const ut = boardUtility(this.gameState); 
      //const ut = boardUtilityCompare(this.gameState,this.parent.gameState);

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
        return this.maxValue();
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
    if (this.maxDepth >= this.depth && this.gameState) {
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
  constructor(rootState, maxDepth) {
    let node = {
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

function buildTree(gameState, maxDepth) {
  return new Tree(gameState, maxDepth);
}

module.exports = buildTree;
//export default buildTree;
