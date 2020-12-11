import React from 'react';
import ReactDOM from 'react-dom';

// 需要在index.html 新建兄弟元素 modal-root
const modalRoot = document.getElementById('modal-root');

function Child() {
    return (
        <div className="modal">
            <button>Click</button>
        </div>
    );
}

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    render() {
        // 渲染时，不插入当前节点下方。而是插入this.el中。
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicks: 0 };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((state) => ({
            clicks: state.clicks + 1,
        }));
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <p>Number of clicks: {this.state.clicks}</p>
                <p>Open up the browser DevTools to observe that the button is not a child of the div with the onClick handler.</p>
                <Modal>
                    {/* 正常来说，这一整块都是属于root根节点下面的内容，但是又想把Child组件插入到root的兄弟节点中。 */}
                    {/* 在Modal组件中设置了其的children插入modal-root节点中。所以该root节点下不会有该Child组件 */}
                    {/* 因为当 Modal 被插入 DOM 树中才能渲染子元素，所以插入Modal组件后其子节点也是会继承了onclick事件 */}
                    <Child />
                </Modal>
            </div>
        );
    }
}

export default <Parent />;
