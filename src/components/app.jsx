import React from 'react';

export const Square = props => (
  <div className="space" onClick={() => props.click(props.row, props.col)}>
    <h3 className={`mark ${props.space}`}>{props.space}</h3>
  </div>
)

export const BoardRow = props => (
  <div className="row">
    {
      props.row.map((space, index) => <Square space={space} row={props.index} col={index} click={props.click}/>)
    }
  </div>
);

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: 'O',
      winner: null,
    };
  }

  cloneBoard() {
    const { board } = this.state
    return board.map(row => row.map(space => space));
  }

  isWinner(winner) {
    if (winner === 3) {
      return 'X';
    } else if (winner === -3) {
      return 'O';
    } else {
      return false;
    }
  }

  checkWinner() {

  }

  checkRow(row) {
    let winner = 0;

    for (let col = 0; col < 3; col += 1) {
      row[col] === 'X' ? winner += 1 : winner -= 1;
    }

    return this.isWinner(winner);
  }

  checkRows() {
    for (const row of this.state.board) {
      const winner = this.checkRow(row);
      if (winner) {
        return winner;
      }
    }
  }

  checkCol(col) {
    let winner = 0;
    const { board } = this.state;

    for (let row = 0; row < 3; row += 1) {
      board[col][row] === 'X' ? winner += 1 : winner -= 1;
    }
    return this.isWinner(winner);
  }

  checkCols() {
    for (let col = 0; col < 3; col += 1) {
      this.checkCol(col);
    }
  }

  checkMajor() {
    let winner = 0;
    const { board } = this.state;
    let col = 0
    for (let row = 0; row < 3; row += 1) {
      board[row][col] === 'X' ? winner += 1 : winner -= 1;
      col += 1;
    }

    return this.isWinner(winner);
  }

  checkMinor() {
    let winner = 0;
    const { board } = this.state;

    let col = 2;
    for (let row = 0; row < 3; row += 1) {
      baord[row][col] === 'X' ? winner += 1 : winner -= 1;
      col -= 1;
    }

    return this.isWinner(winner);
  }

  makeMove(board, row, col) {
    if (board[row][col] === '') {
      const turn = this.state.turn === 'O' ? 'X' : 'O';
      board[row][col] = this.state.turn;
      this.setState({ 
        board,
        turn
      });
    }
  }

  handleClick(row, col) {
    console.log('hit', row, col);
    const board = this.cloneBoard();
    this.makeMove(board, row, col);
  }

  render() {
    return (
      <div className="game">
        <h1>It is currently {this.state.turn}'s turn</h1>
        <div className="board">
          {
            this.state.board.map((row, index) => <BoardRow row={row} index={index} click={(row, col) => this.handleClick(row, col)}/>)
          }
        </div>
      </div>
    );
  }
}

export default Board;