/**
 * Gudea is an improvment of the expectimax AI Gilgamesh.
 *
 */

import GameSimulator from "./tools/GameSumulator";

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
class GudeaAI {
  constructor(depth, color) {
    this.depth = depth;
    this.color = color || "b"; // AI stone color
  }

  calculateMove(state) {
    //return best possible move. IF no possible moves, null is returned.
    if (Object.keys(state.possibleMoves).length === 1) {
      //if only one possible move, return that move.
      return Object.keys(state.possibleMoves)[0];
    }
    if (Object.keys(state.possibleMoves).length === 0) {
      //if no possible move return move
      return null;
    }
    const searchDepth = this.depth; //2;
    const tree = buildTree(state, searchDepth, this.color);
    const max =
      tree.root.children && tree.root.children.length > 0
        ? tree.root.children.reduce((prev, current) =>
            prev.value > current.value ? prev : current
          )
        : {};
    return max.move;
  }
}

//module.exports = GudeaAI;
export default GudeaAI;

//const GameSimulator = require("./Tools/GameSimulator");
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
    if (index === 0) {
      //not on board
      if (enemyStones) {
        //good if enemy has stones off board
        utility += enemyStones * ut.v1;
      }
      if (playerStones) {
        //bad of player have stones off board
        utility -= playerStones * ut.v1;
      }
    }
    if (index === 15) {
      //not on board
      if (enemyStones) {
        //good if enemy has stones off board
        utility -= enemyStones * ut.v1;
      }
      if (playerStones) {
        //bad of player have stones off board
        utility += playerStones * ut.v2;
      }
    }
    if (
      index === 1 &&
      board[1][aiColor] > 0 &&
      board[2][aiColor] > 0 &&
      board[3][aiColor] > 0 &&
      board[4][aiColor] > 0
    ) {
      utility -= playerStones * ut.v2; //if own stones is blocking for each other
    }
    if (index > 12) {
      //safe zone
      if (playerStones) {
        //good if player stones can make it to end safe zone
        utility += playerStones * ut.v1;
      }
      if (enemyStones) {
        //good if player stones can make it to end safe zone
        utility -= playerStones * ut.v1;
      }
    }

    if (playerStones > 0) {
      // console.log('playerStones',playerStones)
      if (index === 4 || index === 3) {
        //squares 3 and 4 are tactical good if enemy has many square at index<5
      }
      if (index === 8) {
        //extra turn
        //keep square 8
        utility += ut.v3;
      }
      if (index === 4 || index === 14) {
        //extra turns
        utility += ut.v2;
      }
    }
    if (index > 4 && index < 13) {
      if (playerStones > 0) {
        //avoid danger
        const enemyOneBehind = board[index - 1][enemyColor]; //number of enemy stones on the square behinde
        const enemyTwoBehind = board[index - 2][enemyColor]; //number of enemy stones on the #2 square behinde

        if (index !== 8) {
          utility -= enemyOneBehind * ut.v1 + enemyTwoBehind * ut.v1;
        }
        // utility += index*ut.v1
        utility += (10 - (13 - index)) / 10;
      }
      if (enemyStones) {
        //own stone before enemy stones in danger area
        const playerStoneOneBehind = board[index - 1][aiColor]; //number of own stones on the square behinde
        const playerStoneTwoBehind = board[index - 2][aiColor]; //number of own stones on the #2 square behinde
        //utility += playerStoneOneBehind * ut.v1*getProbability(1) + playerStoneTwoBehind * ut.v1*getProbability(2);
        if (index !== 8) {
          utility +=
          playerStoneOneBehind * ut.v1 * getProbability(1) +
          playerStoneTwoBehind * ut.v1 * getProbability(2);
        }


        //better if no enemy
        utility -= 8 - (13 - index);
        //betetr if enemy has feve stones
      }
    }
    if (
      (index === 3 || index === 4) &&
      board[5][enemyColor] > 0 &&
      playerStones > 0
    ) {
      //It is good if there is a playerstone at squares 3 or/and 4(safe zone) and there is enemy stones at squares
      utility += ut.v1;
    }
  }
  return utility;
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
    this.children = this.expand();
    if (this.children.length === 0) this.nodeType = IS_Terminal_NODE; //make this prettier

    this.move = move;
    this.value = this.getValue();
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
    switch (this.nodeType) {
      case IS_Terminal_NODE:
        const ut = boardUtility(this.gameState, this.playerColor);
        return ut;

      case IS_MAX_NODE:
        return this.maxValue() + boardUtility(this.gameState, this.playerColor);
      case IS_MIN_NODE:
        return this.minValue() + boardUtility(this.gameState, this.playerColor);

      case IS_CHANCE_NODE:
        return this.expValue() + boardUtility(this.gameState, this.playerColor);
      default:
        return 0;
    }
  }
  maxValue() {
    const maxNode = this.children.reduce((prev, current) =>
      prev.value > current.value ? prev : current
    );
    return maxNode.value;
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
          if (childState) {
            let newNode = {
              gameState: childState,
              parent: this,
              maxDepth: this.maxDepth,
              playerColor: this.playerColor,
              move: move
            };
            children.push(new Node(newNode));
          }
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
              playerColor: this.playerColor,
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
