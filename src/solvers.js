

window.findNRooksSolution = function(n){
  var solution = undefined; //fixme
  //build board
  //check using checkRooksFunction

  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};


var sum = function(array) {
  return _.reduce(array, function(currentTotal, element) {
    return currentTotal + element;
  }, 0);
};































var board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

var solve = function(board) {
  //board is empty to begin
  //1) go thru the rows. find the first empty one
  //2) in that row, for each column:
  //repeat steps 1 and 2
  var firstEmptyRow;
  for (var rowIndex = 0; rowIndex < board.length; rowIndex++) {
    if (sum(board[rowIndex]) === 0) {
      firstEmptyRow = board[rowIndex];
    }
  }
  if (firstEmptyRow) {
    for (var colIndex = 0; colIndex < board.length; colIndex++) {
      firstEmptyRow[colIndex] = 1;
    }
  }
  else {
    boardIsComplete = true;
  }
};



























