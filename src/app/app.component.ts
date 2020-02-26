import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  playerOneTurn = true;
  board = [['E','E','E'],['E','E','E'],['E','E','E']];
  turn = 1;
  gameOver = false;
  tie = false;
  winConditions = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]],
  ]

  changePlayer() {
    this.playerOneTurn = !this.playerOneTurn;
    this.turn++;
  }

  checkWinCondition(row, col) {
      const conditionsToCheck = this.winConditions.filter(cond => JSON.stringify(cond).includes(`${row},${col}`));
      //note: if we want to add a line drawn over the board to mark the winning row/column/diagonal,
      //we would have to get rid of this filtering and check against all of the conditions each time, so we can use the winning condition's index to choose which line to draw.
      //personally, I think such a line is superfluous.
      for (let condition of conditionsToCheck) {
        let square1 = this.board[condition[0][0]][condition[0][1]];
        let square2 = this.board[condition[1][0]][condition[1][1]];
        let square3 = this.board[condition[2][0]][condition[2][1]];
        if (square1 != 'E' && square1 == square2 && square2 == square3) {
          return true;
        }
      }
      return false;
  }

  selectSquare(row, col) {
    if (this.board[row][col] != 'E' || this.gameOver) return;
    this.board[row][col] = this.playerOneTurn ? 'X' : 'O';
    if (this.checkWinCondition(row, col)) {
      this.gameOver = true;
    } else {
      if (this.turn == 9) {
        this.gameOver = true;
        this.tie = true;
      } else {
        this.changePlayer();
      }      
    }    
  }

  resetGame() {
    this.board = [['E','E','E'],['E','E','E'],['E','E','E']];
    this.turn = 1;
    this.gameOver = false;
    this.tie = false;
    this.playerOneTurn = true
  }
}
