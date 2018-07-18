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