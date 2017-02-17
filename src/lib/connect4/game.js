class Game {
    constructor(player1, player2) {
        this.board = [];
        this.columns = Game.defaultColumns;
        this.rows = Game.defaultRows;
        this.streakToWin = Game.defaultStreakToWin;
        this.turn = 1; // starts at 1, not 0
        this.longestStreak = 0;
        this.longestStreakPlayer = null;
        this.player1 = player1;
        this.player2 = player2;
        this.winner = null;
        this.loser = null;

        this.resetBoard();
    }

    columnHeight(column) {
        return this.board[column].length;
    }

    isBoardFull() {
        for (let column = 0; column < this.board.length; column++) {
            if (this.isValidPlay(column)) {
                return false;
            }
        }

        return true;
    }

    isOver() {
        return !!((this.winner && this.loser) || this.isBoardFull());
    }

    isValidPlay(column) {
        // check for invalid column
        if (column > this.columns) {
            return false;
        }

        // check if there is space left in the column
        return (this.board[column].length < this.rows);
    }

    play(player, column) {
        if (!this.isValidPlay(column)) {
            throw new Error('You can\'t place a piece in this column!');
        }

        if (this.playerForTurn() != player) {
            throw new Error('It\;s not your turn!');
        }

        this.board[column].push((player == this.player1) ? 1 : 2);
        const streak = this.streakForPosition(column, this.board[column].length - 1);
        console.log(streak)

        if (streak > this.longestStreak) {
            this.longestStreak = streak;
            this.longestStreakPlayer = player;
        }

        if (streak >= this.streakToWin) {
            this.winner = this.playerForTurn();
            this.loser = (this.winner == this.player1) ? this.player2 : this.player1;
        } else {
            this.turn++;
        }
    }

    playerForTurn() {
        return (this.turn % 2 == 1) ? this.player1 : this.player2;
    }

    printableState() {
        const lines = [];
        const player = this.playerForTurn();

        for (let row = this.rows - 1; row >= 0; row--) {
            let line = '';

            for (let column = 0; column < this.columns; column++) {
                line += this.board[column] && this.board[column][row] || '-';
                line += ' ';
            }

            lines.push(line);
        }

        if (!this.isOver()) {
            lines.push(`It is now turn ${this.turn}, ${player.name}'s move.`);
        }

        return lines.join("\n");
    }

    resetBoard() {
        const board = [];

        for (let column = 0; column < this.columns; column++) {
            board[column] = [];
        }

        this.board = board;
    }

    getRowFromBoard(row) {
      const line = [];

      for (let column = 0; column < this.columns; column++) {
        line.push(this.board[column][row]);
      }

      return line;
    }

    getDiagonalVector(column, row, colDirection, rowDirection, line=[]) {
      if (!(this.board[column] && this.board[column][row])) {
        return line;
      }

      line.push(this.board[column][row]);

      return this.getDiagonalVector(column + colDirection, row + rowDirection, colDirection, rowDirection, line);
    }

    getTopLeftDiagonal(column, row) {
      const leftDiagonalVector = this.getDiagonalVector(column - 1, row - 1, - 1, -1);
      const rightDiagonalVector = this.getDiagonalVector(column + 1, row + 1, 1, 1);

      return leftDiagonalVector.concat(this.board[column][row]).concat(rightDiagonalVector);
    }

    getBottomLeftDiagonal(column, row) {
      const leftDiagonalVector = this.getDiagonalVector(column - 1, row + 1, - 1, 1);
      const rightDiagonalVector = this.getDiagonalVector(column + 1, row - 1, 1, -1);

      return leftDiagonalVector.concat(this.board[column][row]).concat(rightDiagonalVector);
    }

    calculateStreak(line, piece) {
      let streak = 0;

      for (let i = 0; i < line.length; i++) {
        if (line[i] != piece) {
          streak = 0;
          continue;
        }

        streak++;
      }

      return streak;
    }

    streakForPosition(column, row) {
        const piece = this.board[column][row];

        const horizontalLine = this.board[column];
        const verticalLine = this.getRowFromBoard(row);
        const diagonalTopLeftLine = this.getTopLeftDiagonal(column, row);
        const diagonalBottomLeftLine = this.getBottomLeftDiagonal(column, row);

        return Math.max.apply(null, [horizontalLine, verticalLine, diagonalTopLeftLine, diagonalBottomLeftLine].map((line) => {
            return this.calculateStreak(line, piece);
        }, this));
    }
};

Game.defaultColumns = 50;
Game.defaultRows = 50;
Game.defaultStreakToWin = 14;

export default Game;
