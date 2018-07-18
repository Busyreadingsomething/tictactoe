import React from 'react';

export const Square = ({ click, row, col, space }) => (
  <div className="space" onClick={() => click(row, col)}>
    <h3 className={`mark ${space}`}>{space}</h3>
  </div>
)

export const BoardRow = props => (
  <div className="row">
    {
      props.row.map((space, index) => <Square space={space} row={props.index} col={index} click={props.click}/>)
    }
  </div>
);

export const Winner = ({ winner }) => (
  <h1>WINNER IS {winner}</h1>
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

  cloneBoard = () => {
    const { board } = this.state
    return board.map(row => row.map(space => space));
  }

  isWinner = (winner) => {
    if (winner === 3) {
      return 'X';
    } else if (winner === -3) {
      return 'O';
    } else {
      return false;
    }
  }

  checkWinner = () => {
    const {
      checkRows,
      checkCols,
      checkMajor,
      checkMinor,
    } = this;

    const methods = {
      checkRows,
      checkCols,
      checkMajor,
      checkMinor,
    };

    const list = Object.keys(methods);
    let winner = false;
    
    for (const method of list) {
      winner = methods[method]();
      if (winner) {
        this.setState({ winner });
        break;
      }
    }
  }

  checkRow = (row) => {
    let winner = 0;

    for (let col = 0; col < 3; col += 1) {
      if (row[col] === 'X') {
        winner += 1;
      } else if (row[col] === 'O') {
        winner -= 1;
      }
    }

    return this.isWinner(winner);
  }

  checkRows = () => {
    for (const row of this.state.board) {
      const winner = this.checkRow(row);
      if (winner) {
        return winner;
      }
    }
  }

  checkCol = (col) => {
    let winner = 0;
    const { board } = this.state;

    for (let row = 0; row < 3; row += 1) {
      if (board[row][col] === 'X') {
        winner += 1;
      } else if (board[row][col] === 'O') {
        winner -= 1;
      }
    }
    return this.isWinner(winner);
  }

  checkCols = () => {
    for (let col = 0; col < 3; col += 1) {
      let winner = this.checkCol(col);
      if (winner) {
        return winner;
      }

    }
  }

  checkMajor = () => {
    let winner = 0;
    const { board } = this.state;
    let col = 0
    for (let row = 0; row < 3; row += 1) {
      if (board[row][col] === 'X') {
        winner += 1;
      } else if (board[row][col] === 'O') {
        winner -= 1;
      }
      col += 1;
    }

    return this.isWinner(winner);
  }

  checkMinor = () => {
    let winner = 0;
    const { board } = this.state;

    let col = 2;
    for (let row = 0; row < 3; row += 1) {
      if (board[row][col] === 'X') {
        winner += 1;
      } else if (board[row][col] === 'O') {
        winner -= 1;
      }
      col -= 1;
    }

    return this.isWinner(winner);
  }

  makeMove = (board, row, col) => {
    if (board[row][col] === '') {
      const turn = this.state.turn === 'O' ? 'X' : 'O';
      board[row][col] = this.state.turn;
      this.setState({ 
        board,
        turn
      }, this.checkWinner);
    }
  }

  handleClick = (row, col) => {
    const board = this.cloneBoard();
    this.makeMove(board, row, col);
  }

  render() {
    return (
      <div className="game">
        {
          this.state.winner
            ? <Winner winner={this.state.winner} />
            : (<div>
                <h1>It is currently {this.state.turn}'s turn</h1>
                <div className="board">
                  {
                    this.state.board.map((row, index) => <BoardRow row={row} index={index} click={this.handleClick}/>)
                  }
                </div>
              </div>)
        }
      </div>
    );
  }
}

export default Board;