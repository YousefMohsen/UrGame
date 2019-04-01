/**
 * Gilgamesh is an utility AI, that picks the stone with the highest utility.
 * This AI only looks at one move ahead.
 */
//export default
//const Tree = require('./Tools/Tree');
import GameSimulator from "./tools/GameSumulator";
const gameSimulator = new GameSimulator();

const IS_Terminal_NODE = "IS_Terminal_NODE";
const IS_MAX_NODE = "IS_MAX_NODE";
const IS_MIN_NODE = "IS_MIN_NODE";
const IS_CHANCE_NODE = "IS_CHANCE_NODE";
var fs = require("fs");
function writeToJSON(data) {
  fs.writeFile(
    "./src/Ai/generatedTree.json",
    JSON.stringify(data),
    { flag: "w" },
    function(err) {
      if (err) {
        console.log(err);
      }
      console.log("File Saved!");
    }
  );
}
export default class GilgameshAI {
  constructor(depth, aiColor) {
    console.log("gilgamesh constructordepth", depth);
    this.depth = depth;
  }

  calculateMove(state) {
    //return best possible move. IF no possible moves, null is returned.
    if (Object.keys(state.possibleMoves).length === 1) {
      //if only one possible move, return that move.
      return Object.keys(state.possibleMoves)[0];
    }
    if (Object.keys(state.possibleMoves).length === 0) {
      //if no possible moves return null
      return null;
    }
    const searchDepth = this.depth; //2;
    const tree = buildTree(state, searchDepth);

    const max =
      tree.root.children && tree.root.children.length > 0
        ? tree.root.children.reduce((prev, current) =>
            prev.value > current.value ? prev : current
          )
        : {};
    //writeToJSON(tree)
    if (!max) console.log("max is null", max);
    return max.move;
  }
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

function boardUtility(state, aiColor = "b") {
  let utility = 0.0;
  const board = state.board;
  const enemyColor = aiColor === "b" ? "w" : "b";
  board.map((square, index) => {
    if (square[aiColor] > 0 && index > 0) {
      utility += square[enemyColor] ? 15 - (9 - index) : 0;
    }
    if (square[enemyColor] > 0 && index > 0) {
      utility -= square[enemyColor] ? 15 - (9 - index) : 0;
    }
  });
  if (board[8][aiColor]) {
    utility += 0.8;
  }
  if (board[8][enemyColor]) {
    utility -= 0.3;
  }
  if (board[4][aiColor]) {
    utility += 0.5;
  }

  return utility;
}

class Node {
  constructor({ gameState, parent, maxDepth, probability, move }) {
    this.gameState = gameState;
    this.parent = parent;
    this.depth = parent ? parent.depth + 1 : 0;
    this.maxDepth = maxDepth;
    this.probability = probability || 1;
    this.nodeType = this.nodeType ? this.nodeType : this.getNodeType();
    this.children = this.expand();
    if (this.children.length === 0) this.nodeType = IS_Terminal_NODE; //make this prettier
    this.move = move;
    this.value = this.getValue();
  }

  getNodeType() {
    if (this.nodeType) {
      return this.nodeType;
    } else if (!this.parent) {
      return IS_MAX_NODE;
    } else if (
      this.gameState.currentPlayer === "w" &&
      this.parent.gameState.currentPlayer === "w" &&
      this.parent.nodeType === IS_CHANCE_NODE
    ) {
      return IS_MIN_NODE;
    } else if (this.gameState.currentPlayer === "w") {
      return IS_CHANCE_NODE;
    } else {
      return IS_MAX_NODE;
    }
  }
  getValue() {
    //let v;

    switch (this.nodeType) {
      case IS_Terminal_NODE:
        const ut = boardUtility(this.gameState);
        return ut;

      case IS_MAX_NODE:
        return this.maxValue(); // + (this.parent.gameState ? utility(this.parent.gameState, this.move) : 0);
      case IS_MIN_NODE:
        return this.minValue();

      case IS_CHANCE_NODE:
        return this.expValue();

      default:
        return 0;
    }
  }
  maxValue(state) {
    const max = this.children.reduce((prev, current) =>
      prev.value > current.value ? prev : current
    );

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
      v += child.probability * child.value;
    });
    return v;
  }

  expand() {
    if (this.maxDepth > this.depth && this.gameState) {
      // find children if node is non terminal and maxDepth is not reached !this.gameState.winner
      const possibleMoves = this.gameState
        ? Object.keys(this.gameState.possibleMoves)
        : [];
      let children = [];
      if (this.nodeType === IS_MAX_NODE || this.nodeType === IS_MIN_NODE) {
        possibleMoves.map(move => {
          let childState = gameSimulator.getPossibleState(
            this.gameState,
            this.gameState.currentPlayer,
            move,
            1
          );
          let newNode = {
            gameState: childState,
            parent: this,
            maxDepth: this.maxDepth,
            move: move
          };

          if (childState) children.push(new Node(newNode));
        });
      } else if (this.nodeType === IS_CHANCE_NODE) {
        possibleMoves.map(move => {
          var i;
          for (i = 0; i < 5; i++) {
            const probability = getProbability(i);
            let childState = gameSimulator.getPossibleState(
              this.gameState,
              this.gameState.currentPlayer,
              move,
              i
            );
            childState.currentPlayer = this.gameState.currentPlayer;
            let newNode = {
              gameState: childState,
              parent: this,
              maxDepth: this.maxDepth,
              probability: probability,
              move: move
            };

            if (childState) children.push(new Node(newNode));
          }
        });
      }

      return children;
    } else {
      this.nodeType = IS_Terminal_NODE;
    }
    return [];
  }
}

class Tree {
  constructor(rootState, maxDepth) {
    let node = {
      gameState: rootState,
      parent: null,
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
