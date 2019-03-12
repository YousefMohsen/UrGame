
class RandomAI{
    constructor(){

    }
 calculateMove(state){
    console.log('in random Ai',state)

    const rand = Math.floor(Math.random() * Object.keys(state.possibleMoves).length);
    console.log('rand',rand);
    console.log('state.possibleMoves',state.possibleMoves)
return Object.keys(state.possibleMoves)[rand];
}

}

RandomAI.messi="er gud"
export default RandomAI;
























