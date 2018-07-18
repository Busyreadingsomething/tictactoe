import React from 'react';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
    };
  }

  render() {
    return (
      <div>THIS IS THE BOARD</div>
    );
  }
}

export default Board;