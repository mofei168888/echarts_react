import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
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
            history: [newVersion()],
            sort: 'asc',
            id: null,
        };
    }

    handleClick(i, layout) {
        let index = calcIndex(this.state.history, this.state.id);

        let history = this.state.history.slice(0, index + 1);

        const current = history[history.length - 1];

        const squares = current.squares.slice();
        if (calculateWinner(squares).name || squares[i]) {
            return;
        }

        squares[i] = current.xIsNext ? 'X' : 'O';

        let id = (Math.random() * 10000).toFixed(0);

        let version = newVersion({
            id: id,
            squares: squares,
            layout: layout,
            xIsNext: !current.xIsNext,
        });

        history = history.concat(version);

        this.setState({
            history: history,
            id: id,
        });
    }

    jumpTo(id) {
        this.setState({
            id: id,
        });

        let current = getVersion(this.state.history, id);

        let winner = calculateWinner(current.squares);

        if (winner.name) {
            this.setState({
                winner: calculateWinner(current.squares),
            });
        } else {
            this.setState({ winner: { name: '', lines: [] } });
        }
    }

    sort(direction) {
        this.setState({
            sort: direction,
        });
    }

    render() {
        let current = getVersion(this.state.history, this.state.id);

        let winner = calculateWinner(current.squares);

        let status = calcText(current, winner);

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
                    <div className={`lines-${winner.lines.join('')}`}></div>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        <button onClick={() => this.sort('asc')}>升序</button>
                        <button onClick={() => this.sort('desc')}>降序</button>
                    </div>
                    <div>{moves}</div>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

// 根据id计算当前历史记录索引值
function calcIndex(history, id) {
    let ids = history.map((item) => item.id);
    let activeIndex = ids.indexOf(id);

    let index = activeIndex === -1 ? history.length - 1 : activeIndex;

    return index;
}

// 计算胜利者
function calculateWinner(squares) {
    let res = { name: null, lines: [] };

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

    lines.map((item) => {
        let [a, b, c] = item;

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            res = { name: squares[a], lines: item };
        }

        return item;
    });

    return res;
}

// 结算信息
function calcText(current, winner) {
    let end = current.squares.filter((item) => item === null);

    let status = 'Next player: ' + (current.xIsNext ? 'X' : 'O');

    status = winner.name ? 'Winner: ' + winner.name : end.length === 0 ? 'The game has drawn' : status;

    return status;
}

// 根据id获取当前版本对象
function getVersion(history, id) {
    let index = calcIndex(history, id);
    let current = history[index];

    return current;
}

// 实例化一个版本对象
function newVersion(param = {}) {
    return {
        id: param.id || (Math.random() * 10000).toFixed(0),
        squares: param.squares || Array(9).fill(null),
        layout: param.layout || { row: null, col: null },
        xIsNext: param.hasOwnProperty('xIsNext') ? param.xIsNext : true,
    };
}
