class RandomAI {
  calculateMove(state) {
    const rand = Math.floor(
      Math.random() * Object.keys(state.possibleMoves).length
    );
    return Object.keys(state.possibleMoves)[rand];
  }
}
export default RandomAI;