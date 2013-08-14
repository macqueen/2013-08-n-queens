(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    columns: function() {
      return _.zip.apply(_, this.rows());
    },

    getColumn: function(columnIndex) {
      return this.columns()[columnIndex];
    },

    getQueenLocations: function() {
      var locations = [];
      var queenIndex;
      _.each(this.rows(), function(row, rowIndex) {
        locations.push([rowIndex, _.indexOf(row, 1)]);
      });
      return locations;
    },

    getMinorDiagonal: function(rowIndex, columnIndex) {
      //position on the board, so like board is 4x4, a number between 0 and 15
      // row number and column number
      //add 1 to the row until N, and subtract 1 from column until you reach 0
      //NOT NEEDED subtract 1 from the row until 0, and add 1 to the column until N
      var diagonal = [];
      var n = this.get('n');
      while (rowIndex !== n && columnIndex > -1) {
        diagonal.push(this.get(rowIndex++)[columnIndex--]);
      }
      return diagonal;
    },

    getMajorDiagonal: function(rowIndex, columnIndex) {
      var diagonal = [];
      var n = this.get('n');
      while (rowIndex !== n && columnIndex !== n) {
        diagonal.push(this.get(rowIndex++)[columnIndex++]);
      }
      return diagonal;
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      return sum(this.get(rowIndex)) >= 2;
    },

    hasAnyRowConflicts: function(){
      var that = this;
      return _.any(_.range(this.get('n')), function (rowIndex){
        return that.hasRowConflictAt(rowIndex);
      });
    },

    hasColConflictAt: function(colIndex){
      return sum(this.getColumn(colIndex)) >= 2;
    },

    hasAnyColConflicts: function(){
      var that = this;
      return _.any(_.range(this.get('n')), function (colIndex){
        return that.hasColConflictAt(colIndex);
      });
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var diagonal = this.getMajorDiagonal(0, majorDiagonalColumnIndexAtFirstRow);
      return sum(diagonal) >= 2;
    },

    hasAnyMajorDiagonalConflicts: function(){
      var queenLocations = this.getQueenLocations();
      for (var i = 0; i < queenLocations.length; i++) {
        // var diagonal = this.getMajorDiagonal(queenLocations[i][0], queenLocations[i][1]);
        var diagonal = this.getMajorDiagonal.apply(this, queenLocations[i]);
        if (sum(diagonal) >= 2) return true;
      }
      return false;
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      var diagonal = this.getMinorDiagonal(0, minorDiagonalColumnIndexAtFirstRow);
      return sum(diagonal) >= 2;
    },

    hasAnyMinorDiagonalConflicts: function(){
      var queenLocations = this.getQueenLocations();
      for (var i = 0; i < queenLocations.length; i++) {
        // var diagonal = this.getMajorDiagonal(queenLocations[i][0], queenLocations[i][1]);
        var diagonal = this.getMinorDiagonal.apply(this, queenLocations[i]);
        if (sum(diagonal) >= 2) return true;
      }
      return false;
    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
