import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
  render() {
    return (
      <div className='square' onClick={this.props.handleClick}>{this.props.value}</div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }
  handleClick(i) {
    if(calculateWinner(this.state.squares)){
      return
    }
    const squares = this.state.squares
    squares[i] = this.state.xIsNext ? 'x' : 'o'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    })
  }
  render() {
    let winner = calculateWinner(this.state.squares)
    let status
    if (winner) {
      status = 'WINNER IS: ' + winner
    } else {
      status = this.state.xIsNext ? 'next is X' : 'next is O'
    }
    return (
      <div>
        <div>{status}</div>
        <div className='game'>
          {this.state.squares.map((item, index) => {
            return <Square key = {index} value={this.state.squares[index]} handleClick={() => this.handleClick(index)} />
          })}
        </div>
      </div>
    )

  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);



function calculateWinner(squares) {
  let lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
