/*
0) empty board


1) go to the next empty row
2) try to place a new queen in there
   //find the index of the queen
    //index = 2 --> row[2] = 0 row[2+1] = 1
    //index=-1 --> row[-1 + 1] = 1
    //index = n-1, we're outa room --> so go up to the previous row and try again


-->queen works
  -->we have 4 queens
    (possible option) increment counter
    (possibly) append the board to some list
    (somehow stop and return the board as is)
    go back up, and move to the next column above the current row

  -->we have <4 queens
    move to the next row and repeat steps 1 and 2

-->queen fails
  -->if there are untried columns in the current row, 
    goto 2

  -->we've tried everything
    go back up, and move to the next column above the current row
    
*/




window.findNRooksSolution = function(n){
  var board = makeEmptyMatrix(n);
  var solution;

  var willCreateConflict = function(rowNumber, columnNumber) {
    var seriousBoard = new Board(board);
    seriousBoard.togglePiece(rowNumber, columnNumber);
    var result = seriousBoard.hasAnyRooksConflicts();
    seriousBoard.togglePiece(rowNumber, columnNumber);
    return result;
  };

  var tryToPlacePiece = function(board, rowNumber) {
    if (solution) return;
    rowNumber++;
    var row = board[rowNumber];
    var queenIndex = _.indexOf(row, 1);
    var colNumber;
    if (queenIndex < n - 1) {
      if (queenIndex >= 0) row[queenIndex] = 0;
      colNumber = queenIndex + 1;
    }
    else {
      return;
    }

    for (var i = colNumber; i < row.length; i++) {
      if (!willCreateConflict(rowNumber, i)) {
        row[i] = 1;
        if (rowNumber === n - 1) {
          solution = board;
          return solution;
        }
        else {
          tryToPlacePiece(board, rowNumber);
        }
      }
    }
    if (!solution) {
      return;
    }
  };

  tryToPlacePiece(board, -1);
  return solution;
};

window.makeEmptyRow = function(n) {
  return _(_.range(n)).map(function(){
    return 0;
  });
};

window.countNRooksSolutions = function(n){
  var board = makeEmptyMatrix(n);
  var counter = 0;

  var willCreateConflict = function(rowNumber, columnNumber) {
    var seriousBoard = new Board(board);
    seriousBoard.togglePiece(rowNumber, columnNumber);
    var result = seriousBoard.hasAnyRooksConflicts();
    seriousBoard.togglePiece(rowNumber, columnNumber);
    return result;
  };

  var tryToPlacePiece = function(board, rowNumber) {
    rowNumber++;
    var row = board[rowNumber];
    for (var i = 0; i < row.length; i++) {
      if (i > 0) row[i - 1] = 0;

      if (!willCreateConflict(rowNumber, i)) {
        row[i] = 1;
        if (rowNumber === n - 1) {
          counter++;
          row[i] = 0;
          continue;
        }
        else {
          tryToPlacePiece(board, rowNumber);
        }
      }
    }
    if (i > 0) row[i - 1] = 0;
    return;
  };

  tryToPlacePiece(board, -1);
  return counter;
};

window.findNQueensSolution = function(n){
  var board = makeEmptyMatrix(n);
  var solution;

  var willCreateConflict = function(rowNumber, columnNumber) {
    var seriousBoard = new Board(board);
    seriousBoard.togglePiece(rowNumber, columnNumber);
    var result = seriousBoard.hasAnyQueensConflicts();
    seriousBoard.togglePiece(rowNumber, columnNumber);
    return result;
  };

  var tryToPlacePiece = function(board, rowNumber) {
    if (solution) return;
    rowNumber++;
    var row = board[rowNumber];
    for (var i = 0; i < row.length; i++) {
      if (solution) return;
      if (i > 0) row[i - 1] = 0;

      if (!willCreateConflict(rowNumber, i)) {
        row[i] = 1;
        if (rowNumber === n - 1) {
          solution = board;
          return;
        }
        else {
          tryToPlacePiece(board, rowNumber);
        }
      }
    }
    if (solution) {
      return;
    }
    else {
      if (i > 0) row[i - 1] = 0;
      return;
    }
  };

  tryToPlacePiece(board, -1);
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

