import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  // console.log(props) //A React component takes in parameters called props
  // console.log(this.state) 
  
  return (
    // Render method returns React element
    // Below we write React element using JSX, at build time this is transformed to React.createElement('button')
    <button 
      className="square" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
  
  class Board extends React.Component {
    renderSquare(i) {
      // passing down 2 props from Board's prop to Square: value & onClick

      return (
        <Square
          value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      // console.log(this.props)
  
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
      }
    }

    handleClick(i){
      const history = this.state.history;
      const current = history[history.length-1];
      const squares = current.squares.slice();
      // Do nothing if there is winner or square is already clicked
      if (calculateWinner(squares) || squares[i]){
        return;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,

        }]),
        xIsNext: !this.state.xIsNext,
      });
      
    }

    render() {
      const history = this.state.history;
      const current = history[history.length-1];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
          <li>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      })

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            
            />
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  