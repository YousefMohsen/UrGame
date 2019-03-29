const Ur = require("../GameEngine");
const GameSimulator = require("./Tools/GameSimulator");
const GilgameshAI = require("./GilgameshAI");
const GudeaAI = require("./Gudea");
const ActionEvalAi = require("./ActionEvalAi");

const buildTree = require("./Tools/Tree");
const AI = new GilgameshAI();
//const gudea =  new GudeaAI();
var util = require("util");
const BLACK = "b";
const WHITE = "w";

const initState = {
  currentPlayer: "b",
  dice: [0, 1, 1, 0],
  diceResult: 2,
  possibleMoves: { "0": 1, "2": 3 },
  board: [
    { w: 4, b: 5 }, //0
    { w: 0, b: 0 }, //1
    { w: 0, b: 0 }, //2
    { w: 1, b: 0 }, //3
    { w: 1, b: 0 }, //#4 holy
    { w: 0, b: 0 }, //5
    { w: 0, b: 1 }, //6
    { w: 1, b: 0 }, //7
    { w: 0, b: 0 }, //8
    { w: 0, b: 0 }, //9
    { w: 0, b: 1 }, //10
    { w: 0, b: 0 }, //11
    { w: 0, b: 0 }, //12
    { w: 0, b: 0 }, //13
    { w: 0, b: 0 }, //14
    { w: 1, b: 0 }
  ]
}; //# 15 scoring stone

const testState = {
  currentPlayer: "w",
  dice: [1, 0, 1, 1],
  diceResult: 1,
  possibleMoves: { "0": 1, "2": 3, "8": 9 },
  board: [
    { w: 5, b: 4 },
    { w: 0, b: 0 },
    { w: 1, b: 0 },
    { w: 0, b: 0 },
    { w: 0, b: 0 },
    { w: 0, b: 1 },
    { w: 0, b: 0 },
    { w: 0, b: 1 },
    { w: 1, b: 0 },
    { w: 0, b: 1 },
    { w: 0, b: 0 },
    { w: 0, b: 0 },
    { w: 0, b: 0 },
    { w: 0, b: 0 },
    { w: 0, b: 0 },
    { w: 0, b: 0 }
  ]
};
// boardUtility(testState)

//boardUtility(parentState,initState);

// Ur(stones?: number, dice?: number, player?: string)
const game = new Ur(7, 4, Ur.BLACK);
// default: stones = 7, dice = 4, player = Ur.WHITE
const gameSimulator = new GameSimulator();
let state = game.getState();
//console.log(JSON.stringify(state))
//state =game.takeTurn(state.currentPlayer,0)
//state =game.takeTurn(state.currentPlayer,0)

//let initState = require('./initState.json');
//console.log('firststate',initState)

//const gameSimulator = new GameSimulator();

// takeTurn(state: Object, player: string, move?: string | number)
//state =game.takeTurn(state.currentPlayer,0)
//state =game.takeTurn(state.currentPlayer,0)
//console.log('state1',state)
//console.log('state.currentplayer',state.currentPlayer)
//let possibleState  = gameSimulator.getPossibleState(state,state.currentPlayer,0,4);
//console.log('possibleState.currentplayer',possibleState.currentPlayer)

//console.log('possibleState',possibleState)

function oneMove() {
  const ai = new GilgameshAI(3);
  const gudeaAi = new GudeaAI(3, BLACK); //new GilgameshAI(depth);
  const game = new Ur(7, 4, Ur.BLACK);
  // default: stones = 7, dice = 4, player = Ur.WHITE
  let state = game.getState();

  for (let index = 0; index < 20; index++) { }
  //console.log('initState:before',initState)
  let counter = 0;
  while (!(counter > 5 && state.currentPlayer === "b")) {
    const rand = Math.floor(
      Math.random() * Object.keys(state.possibleMoves).length
    );

    state = game.takeTurn(
      state.currentPlayer,
      Object.keys(state.possibleMoves)[rand]
    );
    counter++;
  }
  console.log("state.currentPlayer", state.currentPlayer);
  const move = gudeaAi.calculateMove(state);
  console.log("move", move);
}
for (let index = 2; index < 10; index++) {
  //  const element = array[index];
  //gudeaVsGilgamesh(10,index)
  //randomVsAI(10,index);

}


gudeaVsGilgamesh(100, 1 )

//randomVsAI(100,3);
//oneMove()
//console.log('state',state)
//const tree = buildTree(state,2)
//console.log('tree',tree)
//var fs = require('fs');

//console.log('initState:after',initState)
/*fs.writeFile('./src/Ai/initState.json', JSON.stringify(state), { flag: 'w' }, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('File Saved!');

});*/
//console.log('tree',util.inspect(tree))

//printChildren(tree.root)

function printChildren(node) {
  node.children.map((child, i) => {
    console.log("\n\nchild", i, "of ", node.depth, child.gameState, "\n\n");
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


function randomVsAI(games, depth) {
  let blackWins = 0;
  let whiteWins = 0;

  const gudeaAi = new GudeaAI(depth, BLACK); //new GilgameshAI(depth);
  // const gilgameshAi = new GilgameshAI(depth, BLACK); //black is default

  for (let index = 0; index < games; index++) {
    const game = new Ur(7, 4, Ur.WHITE);
    let state = game.getState();

    let lopX = 0;
    while (!state.winner) {
      //    lopX++;
      // console.log('\nstate:before', state);

      if (!state.possibleMoves) {
        console.log(
          "\nDidnt find any possibleMoves!",
          state.possibleMoves,
          "\n"
        );
      }
      if (state.diceResult > 0 && Object.keys(state.possibleMoves).length > 0) {
        const rand = Math.floor(Math.random() * Object.keys(state.possibleMoves).length);


        const move = state.currentPlayer === BLACK ? gudeaAi.calculateMove(state) : Object.keys(state.possibleMoves)[rand];
        state = game.takeTurn(state.currentPlayer, move);

      } else {
        state = game.voidTurn(state.currentPlayer);
      }

      // or game.takeTurn('w', 0);
    }

    if (state.winner === "w") {
      whiteWins++;
    } else if (state.winner === "b") {
      blackWins++;
    }
    console.log(
      index + 1,
      "games played.  Gudea won::",
      blackWins,
      " Random won:",
      whiteWins
    );
  }

  console.log(
    "Depth: ",
    depth,
    ", ",
    " played games:",
    games,
    "  Gudea won::",
    blackWins,
    " Random won:",
    whiteWins
  );
}
function gudeaVsGilgamesh(games, depth) {
  let blackWins = 0;
  let whiteWins = 0;

  const gudeaAi = new GudeaAI(depth, WHITE); //new GilgameshAI(depth);
  const gilgameshAi = new ActionEvalAi(1, BLACK); //black is default

  for (let index = 0; index < games; index++) {
    const game = new Ur(7, 4, Ur.WHITE);
    let state = game.getState();

    let lopX = 0;
    while (!state.winner) {
      //    lopX++;
      // console.log('\nstate:before', state);

      if (!state.possibleMoves) {
        console.log(
          "\nDidnt find any possibleMoves!",
          state.possibleMoves,
          "\n"
        );
      }
      if (state.diceResult > 0 && Object.keys(state.possibleMoves).length > 0) {
        // const rand = Math.floor(Math.random() * Object.keys(state.possibleMoves).length);
        const move =
          state.currentPlayer === BLACK
            ? gilgameshAi.calculateMove(state)
            : gudeaAi.calculateMove(state);
        state = game.takeTurn(state.currentPlayer, move);
      } else {
        state = game.voidTurn(state.currentPlayer);
      }

      // or game.takeTurn('w', 0);
    }

    if (state.winner === "w") {
      whiteWins++;
    } else if (state.winner === "b") {
      blackWins++;
    }
    console.log(
      index + 1,
      "games played.  other AI won::",
      blackWins,
      " Gudea won:",
      whiteWins
    );
  }

  console.log(
    "Depth: ",
    depth,
    ", ",
    " played games:",
    games,
    "  Gilgamesh won::",
    blackWins,
    " Gudea won:",
    whiteWins
  );
}

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
