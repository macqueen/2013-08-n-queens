// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)


var doit = function() {
  var found = false;
  var board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];

  var seriouslyDoIt = function() {
    for (var col =0; col < 4; col++) {
      for (var row = 0; row < 4; row++) {
        if (!(new Board(board)).hasAnyQueensConflicts()) found = true;
        if (!found) {
          board[row][col] = 1;
          seriouslyDoIt();
          board[row][col] = 0;
        }
      }
    }
  };
  seriouslyDoIt();

  return board;
};


var doCircularStuff = function(n) {
  var toiterate = [[
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]];
  var currentRow = 0;
  while(toiterate.length !== 0){
    // this would hopefully create and add 4 new arrays 1s in different columns of row 2
    for (var i = 0; i < n; i ++) {
      copyOfToiterate[0][currentRow][i] = 1;
      toiterate.push(copyOfToiterate);
    }
    // then increment current row
    // last thing is to remove the current array in toiterate
  }

};

// doStuff(empty, 0)
//look at the board at the current column (0)
//put something at the first free row in that column
//which would be 0,0
//then check if it has 4 queens
//if so, check quality and idk
//if not, doStuff(moddedboard, 0)
//the first column is all 1s
var n = 4;

var doStuff = function(possibleBoards, board) {
  possibleBoards = possibleBoards || [];
  board = board || [];
  //board = [];
  var newRow = [0,0,0,0];
  _.each(_.range(n), function(colIndex){
    //debugger;
    newRow[colIndex] = 1;
    if (board.length < n) {
      board.push(newRow.slice());
      doStuff(possibleBoards, board);
    }
    else {
      //possibleBoards.push(board.slice());
      possibleBoards.push($.extend(true, [], board));
    }
  });
  return possibleBoards;
};

var doStuff2= function() {
  possibleBoards = [];
  var board;
  for (var col=0; col < 4; col++) {
    board = [];
    for (var row=0; row <4; row++) {
      var newRow = [0,0,0,0];
      newRow[col] = 1;
      board.push(newRow);
    }
    possibleBoards.push(board);
  }
  return possibleBoards;
};

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