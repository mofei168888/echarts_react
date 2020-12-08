import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i, layout) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i, layout)} />;
    }

    render() {
        let number = 0;
        let rowArr = Array(3).fill(null);
        let colArr = Array(3).fill(null);

        const row = rowArr.map((rowItem, rowIndex) => {
            const col = colArr.map((colItem, colIndex) => {
                number++;
                return <span key={number}>{this.renderSquare(number - 1, { row: rowIndex + 1, col: colIndex + 1 })}</span>;
            });

            return (
                <div className="board-row" key={rowIndex}>
                    {col}
                </div>
            );
        });

        return row;
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [
                {
                    id: (Math.random() * 10000).toFixed(0),
                    squares: Array(9).fill(null),
                    layout: { row: null, col: null },
                },
            ],
            xIsNext: true,
            sort: 'asc',
            id: null,
        };
    }

    handleClick(i, layout) {
        let history = this.state.history.slice();

        const current = history[history.length - 1];

        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        let id = (Math.random() * 10000).toFixed(0);

        history = history.concat([
            {
                id: id,
                squares: squares,
                layout: layout,
            },
        ]);

        this.setState({
            history: history,
            xIsNext: !this.state.xIsNext,
            id: id,
        });
    }

    jumpTo(id) {
        this.setState({
            id: id,
        });
    }

    sort(direction) {
        this.setState({
            sort: direction,
        });
    }

    render() {
        let activeIndex = null;
        this.state.history.map((item, index) => {
            if (item.id === this.state.id) {
                activeIndex = index;
            }

            return item;
        });

        let index = activeIndex === null ? this.state.history.length - 1 : activeIndex;

        const current = this.state.history[index];
        const winner = calculateWinner(current.squares);

        // 计算胜利者
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        // 按钮
        let sort = (
            <div>
                <button onClick={() => this.sort('asc')}>升序</button>
                <button onClick={() => this.sort('desc')}>降序</button>
            </div>
        );

        // 历史记录列表
        let history = this.state.history.slice();
        history = this.state.sort === 'asc' ? history : history.reverse();

        const moves = history.map((step, move) => {
            let index = this.state.sort === 'asc' ? move : history.length - move - 1;

            const desc = 'Go to move #' + (index + 1);

            return (
                <li key={step.id}>
                    <button onClick={() => this.jumpTo(step.id)} className={[this.state.id === step.id ? 'to__active' : '']}>
                        {desc} row:{step.layout.row} col:{step.layout.col} id:{step.id}
                    </button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i, layout) => this.handleClick(i, layout)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    {sort}
                    <div>{moves}</div>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares) {
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
