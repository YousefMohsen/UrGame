import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Components/Game'
import { Button, Heading } from 'grommet';

let tree  = require('./generatedTree.json');
console.log(tree);
class Tree extends Component {
  constructor(props) {
    super()
    this.state = {
      enterAIMenu: true,
      enterGame: true,
      aiType:'gilgamesh'
    }
  }

renderTree(node){

    
    node.children.map((child,i)=>{
        console.log('\n\nchild', i,'of ',node.depth,child.gameState,'\n\n')
        this.renderTree(child);
    });
}
  render() {

    return (
      <div className="">
  MEssi
      </div>
    );
  }
}

export default Tree;
