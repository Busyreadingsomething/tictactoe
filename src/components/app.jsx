import React from 'react';

const Square = props => (
  <div className="space" onClick={props.click}>
    TESTING
  </div>
)

const BoardRow = props => (
  <div>
    {
      props.row.map(space => <Square space={space} click={props.click}/>)
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
    };
  }

  handleClick() {
    console.log('hit');
  }

  render() {
    return (
      <div>
        {
          this.state.board.map(row => <BoardRow row={row} click={() => this.handleClick}/>)
        }
      </div>
    );
  }
}

export default Board;