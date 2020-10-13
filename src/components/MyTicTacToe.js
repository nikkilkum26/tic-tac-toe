import React, { Component } from 'react'
import Myboard from './Myboard';

export default class MyTicTacToe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ]
        }
    }
    goto(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step%2)===0
        })
    }

    handleClick(i) {
        let history = this.state.history.slice(0, this.state.stepNumber + 1);
        let currentHistory = history[history.length - 1];
        let squares = currentHistory.squares.slice();
        let winner = calculateWinner(squares);
        if (winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });

    }

    render() {
        let history = this.state.history;
        let currentHistory = history[this.state.stepNumber];
        let winner = calculateWinner(currentHistory.squares);
        let moves = history.map((step, move) => {
            let desc = move ? 'Go to #' + move : 'Reset game';
            return (
                <li key={move}>
                    <button onClick={() => { this.goto(move) }}>
                        {desc}
                    </button>
                </li>
            )
        });
        let flag;
        if (winner) {
            flag = 'Winner is ' + winner;
        } else {
            flag = 'Next Player is ' + (this.state.xIsNext ? 'X' : 'O');
        }


        return (
            <div className="mygame">
                <div className="game-board">
                    <Myboard onClick={(i) => this.handleClick(i)}
                        squares={currentHistory.squares} />
                </div>
                <div className="game-info">
                    <div>{flag}</div>
                    <ul>{moves}</ul>
                </div>

            </div>
        )
    }
}

function calculateWinner(squares) {
    let lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        let [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}