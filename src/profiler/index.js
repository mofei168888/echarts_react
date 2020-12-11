import React, { Profiler } from 'react';

class Child extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [
                {
                    name: '小明',
                },
                {
                    name: '小红',
                },
                {
                    name: '安琪拉',
                },
            ],
        };

        setTimeout(() => {
            this.setState({
                list: [
                    {
                        name: '小明',
                    },
                    {
                        name: '小黑',
                    },
                    {
                        name: '安琪拉',
                    },
                ],
            });
        }, 1000);
    }

    render() {
        let list = this.state.list.map((item, index) => {
            return (
                <div key={index}>
                    {item.name} {index}
                </div>
            );
        });

        return list;
    }
}

const App = () => {
    let callback = (...param) => {
        let [
            id, // 发生提交的 Profiler 树的 “id”
            phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
            actualDuration, // 本次更新 committed 花费的渲染时间
            baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
            startTime, // 本次更新中 React 开始渲染的时间
            commitTime, // 本次更新中 React committed 的时间
            interactions, // 属于本次更新的 interactions 的集合
        ] = param;

        let res = {
            id: id,
            phase,
            actualDuration,
            baseDuration,
            startTime,
            commitTime,
            interactions,
        };

        console.log(res);
    };

    return (
        <div>
            <Profiler id="Navigation" onRender={callback}>
                <Child />
            </Profiler>
        </div>
    );
};

export default <App />;
