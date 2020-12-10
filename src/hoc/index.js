import React from 'react';

let DataSource = {
    getComments() {
        return ['testA', 'testB'];
    },

    getBlogPost(id) {
        return {
            id: id,
            name: 'xiaoming',
        };
    },
};

class CommentList extends React.Component {
    render() {
        console.log(this.props.data);
        return <div>{this.props.data}</div>;
    }
}

class BlogPost extends React.Component {
    render() {
        return (
            <React.Fragment>
                <span>{this.props.data.id}</span>
                <span>{this.props.data.name}</span>
            </React.Fragment>
        );
    }
}

// 此函数接收一个组件...
function withSubscription(WrappedComponent, selectData) {
    // ...并返回另一个组件...
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: selectData(DataSource, props),
            };
        }

        // 挂载
        componentDidMount() {}

        // 取消挂载
        componentWillUnmount() {}

        render() {
            // ... 并使用新数据渲染被包装的组件!
            // 请注意，我们可能还会传递其他属性
            return <WrappedComponent data={this.state.data} {...this.props} />;
        }
    };
}

const CommentListWithSubscription = withSubscription(CommentList, (DataSource) => DataSource.getComments());
const BlogPostWithSubscription = withSubscription(BlogPost, (DataSource, props) => DataSource.getBlogPost(5));

class App extends React.Component {
    render() {
        return (
            <div>
                <CommentListWithSubscription />
                <BlogPostWithSubscription />
            </div>
        );
    }
}

export default <App />;
