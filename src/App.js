import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Components/Game'
import { Button, Heading } from 'grommet';
import Graph from 'react-graph-vis'


class App extends Component {
  constructor(props) {
    super()
    this.state = {
      enterAIMenu: true,
      enterGame: true,
      aiType:'gilgamesh'
    }


  }


  renderContent() {
   const  sreenTooSmall = window.innerWidth <= 805;


    if(sreenTooSmall){

      return(
        <React.Fragment>

        <h1 style={{ display: 'block' }}>The Royale Game Of Ur </h1>
        <img className="App-logo" src="w-stone.png" />

      <h1>Your screen is too small :/</h1>
      
      </React.Fragment>
)
    }

    if (this.state.enterGame) {
      return <Game aiType={this.state.aiType} goBack={() => { this.setState({ enterGame: false, enterAIMenu: false }) }} />
    }
    if (this.state.enterAIMenu) {
      return (

        <div>

          <img className="App-logo" src="w-stone.png" />

          <h1>Choose an AI</h1>

          <Button
            color="white"
            primary={true}
            label='Gilgamesh (minimax AI)'
            onClick={() => { this.setState({ enterGame: true, aiType: 'gilgamesh' }) }}
            style={{ margin: '20px 0px', display: 'block', width: '100%' }}
          />

          <Button
            color="white"
            primary={true}
            label='Nabu (x AI)'
            onClick={() => { this.setState({ enterGame: true, aiType: 'nabu' }) }}
            style={{ margin: '20px 0px', display: 'block', width: '100%' }}

          />

          <Button
            color="white"
            primary={true}
            label='Enkidu(Random player)'
            onClick={() => { this.setState({ enterGame: true, aiType: 'random' }) }}
            style={{ margin: '20px 0px', display: 'block', width: '100%' }}

          />

          <Button
            color="white"
            primary={true}
            label="Back"
            onClick={()=>{this.setState({ enterAIMenu: false })}}
            style={{ position: 'absolute', left: '14px', top: '14px' }}
          />

        </div>

      )

    }
    return (
      <React.Fragment>
        <img className="App-logo" src="w-stone.png" />
        <h1 style={{ display: 'block' }}>The Royale Game Of Ur </h1>
        <Button
          color="white"
          primary={true}
          label="Start Game"
          onClick={() => { this.setState({ enterAIMenu: true, }) }}
        />
      </React.Fragment>
    )
  }


renderFooter(){
  return( 
  <div class="container">
</div>)
}
  render() {
    const content = this.renderContent()
    const footer = this.renderFooter();



   
  console.log('GRAPH', graph)



    return (
      <div className="App">
        <header className="App-header">

          {content}
        </header>
        {footer}
      </div>
    );
  }
}


var graph = {
    gameState: {
      currentPlayer: 'b',
      dice: [
        0,
        0,
        0,
        1
      ],
      diceResult: 1,
      possibleMoves: {
        '0': 1
      },
      board: [
        {
          w: 6,
          b: 7
        },
        {
          w: 1,
          b: 0
        },
        {
          w: 0,
          b: 0
        },
        {
          w: 0,
          b: 0
        },
        {
          w: 0,
          b: 0
        },
        {
          w: 0,
          b: 0
        },
        {
          w: 0,
          b: 0
        },
        {
          w: 0,
          b: 0
        },
        {
          w: 0,
          b: 0
        },
        {
          w: 0,
          b: 0
        },
        {
          w: 0,
          b: 0
        },
        {
          w: 0,
          b: 0
        },
        {
          w: 0,
          b: 0
        },
        {
          w: 0,
          b: 0
        },
        {
          w: 0,
          b: 0
        },
        {
          w: 0,
          b: 0
        }
      ]
    },
    depth: 0,
    maxDepth: 3,
    children: [
      {
        gameState: {
          currentPlayer: 'w',
          dice: [
            1,
            1,
            1,
            0
          ],
          diceResult: 3,
          possibleMoves: {
            '0': 3,
            '1': 4
          },
          board: [
            {
              w: 6,
              b: 6
            },
            {
              w: 1,
              b: 1
            },
            {
              w: 0,
              b: 0
            },
            {
              w: 0,
              b: 0
            },
            {
              w: 0,
              b: 0
            },
            {
              w: 0,
              b: 0
            },
            {
              w: 0,
              b: 0
            },
            {
              w: 0,
              b: 0
            },
            {
              w: 0,
              b: 0
            },
            {
              w: 0,
              b: 0
            },
            {
              w: 0,
              b: 0
            },
            {
              w: 0,
              b: 0
            },
            {
              w: 0,
              b: 0
            },
            {
              w: 0,
              b: 0
            },
            {
              w: 0,
              b: 0
            },
            {
              w: 0,
              b: 0
            }
          ]
        },
        depth: 1,
        maxDepth: 3,
        children: [
          {
            gameState: {
              currentPlayer: 'b',
              dice: [
                1,
                0,
                0,
                1
              ],
              diceResult: 2,
              possibleMoves: {
                '0': 2,
                '1': 3
              },
              board: [
                {
                  w: 5,
                  b: 6
                },
                {
                  w: 1,
                  b: 1
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 1,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                }
              ]
            },
            depth: 2,
            maxDepth: 3,
            children: [
              {
                gameState: {
                  currentPlayer: 'w',
                  dice: [
                    1,
                    0,
                    0,
                    1
                  ],
                  diceResult: 2,
                  possibleMoves: {
                    '0': 2,
                    '3': 5
                  },
                  board: [
                    {
                      w: 5,
                      b: 5
                    },
                    {
                      w: 1,
                      b: 1
                    },
                    {
                      w: 0,
                      b: 1
                    },
                    {
                      w: 1,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    }
                  ]
                },
                depth: 3,
                maxDepth: 3,
                children: [
                  {
                    gameState: {
                      currentPlayer: 'b',
                      dice: [
                        0,
                        0,
                        1,
                        0
                      ],
                      diceResult: 1,
                      possibleMoves: {
                        '2': 3
                      },
                      board: [
                        {
                          w: 4,
                          b: 5
                        },
                        {
                          w: 1,
                          b: 1
                        },
                        {
                          w: 1,
                          b: 1
                        },
                        {
                          w: 1,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        }
                      ]
                    },
                    depth: 4,
                    maxDepth: 3,
                    children: []
                  },
                  {
                    gameState: {
                      currentPlayer: 'b',
                      dice: [
                        0,
                        1,
                        1,
                        0
                      ],
                      diceResult: 2,
                      possibleMoves: {
                        '1': 3,
                        '2': 4
                      },
                      board: [
                        {
                          w: 5,
                          b: 5
                        },
                        {
                          w: 1,
                          b: 1
                        },
                        {
                          w: 0,
                          b: 1
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 1,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        }
                      ]
                    },
                    depth: 4,
                    maxDepth: 3,
                    children: []
                  }
                ]
              },
              {
                gameState: {
                  currentPlayer: 'w',
                  dice: [
                    1,
                    1,
                    1,
                    1
                  ],
                  diceResult: 4,
                  possibleMoves: {
                    '0': 4,
                    '1': 5,
                    '3': 7
                  },
                  board: [
                    {
                      w: 5,
                      b: 6
                    },
                    {
                      w: 1,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 1,
                      b: 1
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    }
                  ]
                },
                depth: 3,
                maxDepth: 3,
                children: [
                  {
                    gameState: {
                      currentPlayer: 'w',
                      dice: [
                        1,
                        0,
                        1,
                        0
                      ],
                      diceResult: 2,
                      possibleMoves: {
                        '0': 2,
                        '3': 5,
                        '4': 6
                      },
                      board: [
                        {
                          w: 4,
                          b: 6
                        },
                        {
                          w: 1,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 1,
                          b: 1
                        },
                        {
                          w: 1,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        }
                      ]
                    },
                    depth: 4,
                    maxDepth: 3,
                    children: []
                  },
                  {
                    gameState: {
                      currentPlayer: 'b',
                      dice: [
                        1,
                        0,
                        1,
                        0
                      ],
                      diceResult: 2,
                      possibleMoves: {
                        '0': 2,
                        '3': 5
                      },
                      board: [
                        {
                          w: 5,
                          b: 6
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 1,
                          b: 1
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 1,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        }
                      ]
                    },
                    depth: 4,
                    maxDepth: 3,
                    children: []
                  },
                  {
                    gameState: {
                      currentPlayer: 'b',
                      dice: [
                        1,
                        0,
                        1,
                        1
                      ],
                      diceResult: 3,
                      possibleMoves: {
                        '3': 6
                      },
                      board: [
                        {
                          w: 5,
                          b: 6
                        },
                        {
                          w: 1,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 1
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 1,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        }
                      ]
                    },
                    depth: 4,
                    maxDepth: 3,
                    children: []
                  }
                ]
              }
            ]
          },
          {
            gameState: {
              currentPlayer: 'w',
              dice: [
                1,
                0,
                0,
                0
              ],
              diceResult: 1,
              possibleMoves: {
                '0': 1,
                '4': 5
              },
              board: [
                {
                  w: 6,
                  b: 6
                },
                {
                  w: 0,
                  b: 1
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 1,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                },
                {
                  w: 0,
                  b: 0
                }
              ]
            },
            depth: 2,
            maxDepth: 3,
            children: [
              {
                gameState: {
                  currentPlayer: 'b',
                  dice: [
                    1,
                    1,
                    1,
                    1
                  ],
                  diceResult: 4,
                  possibleMoves: {
                    '0': 4,
                    '1': 5
                  },
                  board: [
                    {
                      w: 5,
                      b: 6
                    },
                    {
                      w: 1,
                      b: 1
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 1,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    }
                  ]
                },
                depth: 3,
                maxDepth: 3,
                children: [
                  {
                    gameState: {
                      currentPlayer: 'b',
                      dice: [
                        1,
                        0,
                        1,
                        1
                      ],
                      diceResult: 3,
                      possibleMoves: {
                        '0': 3,
                        '4': 7
                      },
                      board: [
                        {
                          w: 5,
                          b: 5
                        },
                        {
                          w: 1,
                          b: 1
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 1,
                          b: 1
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        }
                      ]
                    },
                    depth: 4,
                    maxDepth: 3,
                    children: []
                  },
                  {
                    gameState: {
                      currentPlayer: 'w',
                      dice: [
                        1,
                        0,
                        1,
                        1
                      ],
                      diceResult: 3,
                      possibleMoves: {
                        '0': 3,
                        '4': 7
                      },
                      board: [
                        {
                          w: 5,
                          b: 6
                        },
                        {
                          w: 1,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 1,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 1
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        }
                      ]
                    },
                    depth: 4,
                    maxDepth: 3,
                    children: []
                  }
                ]
              },
              {
                gameState: {
                  currentPlayer: 'b',
                  dice: [
                    1,
                    0,
                    1,
                    1
                  ],
                  diceResult: 3,
                  possibleMoves: {
                    '0': 3,
                    '1': 4
                  },
                  board: [
                    {
                      w: 6,
                      b: 6
                    },
                    {
                      w: 0,
                      b: 1
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 1,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    },
                    {
                      w: 0,
                      b: 0
                    }
                  ]
                },
                depth: 3,
                maxDepth: 3,
                children: [
                  {
                    gameState: {
                      currentPlayer: 'w',
                      dice: [
                        0,
                        1,
                        1,
                        1
                      ],
                      diceResult: 3,
                      possibleMoves: {
                        '0': 3,
                        '5': 8
                      },
                      board: [
                        {
                          w: 6,
                          b: 5
                        },
                        {
                          w: 0,
                          b: 1
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 1
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 1,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        }
                      ]
                    },
                    depth: 4,
                    maxDepth: 3,
                    children: []
                  },
                  {
                    gameState: {
                      currentPlayer: 'b',
                      dice: [
                        0,
                        0,
                        0,
                        1
                      ],
                      diceResult: 1,
                      possibleMoves: {
                        '0': 1,
                        '4': 5
                      },
                      board: [
                        {
                          w: 6,
                          b: 6
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 1
                        },
                        {
                          w: 1,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        },
                        {
                          w: 0,
                          b: 0
                        }
                      ]
                    },
                    depth: 4,
                    maxDepth: 3,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  
};

export default App;
