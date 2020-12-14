import React from 'react';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <div className="square" onClick={this.props.onClick}>
                {this.props.value}
            </div>
        );
    }
}

class Board extends React.Component {
    renderSquare(i, layout) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i, layout)} />;
    }

    render() {
        let arr = Array(9).fill(null);
        let span = arr.map((item, index) => (
            <div className="board-item" key={index}>
                {this.renderSquare(index, { row: Math.floor(index / 3) + 1, col: (index % 3) + 1 })}
            </div>
        ));

        return span;
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
        let index = calcIndex(this.state.history, this.state.id); // 获取历史记录索引值
        let history = this.state.history.slice(0, index + 1); // 历史记录截取
        let current = history[history.length - 1]; // 获取当前版本
        let squares = current.squares.slice();
        let winner = calculateWinner(squares); // 计算是否有胜利者

        if (!winner.name && !squares[i]) {
            squares[i] = current.xIsNext ? 'X' : 'O';

            let id = (Math.random() * 10000).toFixed(0);

            let version = newVersion({
                id: id,
                squares: squares,
                layout: layout,
                xIsNext: !current.xIsNext,
            });

            this.setState({
                history: history.concat(version),
                id: id,
            });
        }
    }

    jumpTo(id) {
        this.setState({
            id: id,
        });

        let current = getVersion(this.state.history, id); // 获取当前版本
        let winner = calculateWinner(current.squares); // 计算是否有胜利者

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
        let current = getVersion(this.state.history, this.state.id); // 获取当前版本
        let winner = calculateWinner(current.squares); // 计算是否有胜利者
        let status = calcText(current, winner); // 获取结算信息
        let history = this.state.history.slice();
        history = this.state.sort === 'asc' ? history : history.reverse(); // 历史记录排序方向

        let moves = history.map((step, move) => {
            let index = this.state.sort === 'asc' ? move : history.length - move - 1;
            let desc = 'Go to move #' + (index + 1);

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
                    <div>
                        <button onClick={() => this.sort('asc')}>升序</button>
                        <button onClick={() => this.sort('desc')}>降序</button>
                    </div>
                    <div>{status}</div>
                    <div>{moves}</div>
                </div>
            </div>
        );
    }
}

// ========================================

export default <Game />;

// 根据id计算当前历史记录索引值
function calcIndex(history, id) {
    let ids = history.map((item) => item.id);
    let index = ids.indexOf(id) === -1 ? history.length - 1 : ids.indexOf(id);

    return index;
}

// 计算胜利者
function calculateWinner(squares) {
    let res = { name: null, lines: [] };
    let lines = ['012', '345', '678', '036', '147', '258', '048', '246'].map((item) => item.split(''));

    lines.map((item) => {
        let [a, b, c] = item;
        let hasWinner = squares[a] && squares[a] === squares[b] && squares[a] === squares[c];
        res = hasWinner ? { name: squares[a], lines: item } : { name: null, lines: [] };

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
