import React from 'react';

let createReactClass = require('create-react-class');

let MixinsApp = {
    componentDidMount() {
        console.log('Mixins');
    },
};

let App = createReactClass({
    mixins: [MixinsApp],

    getInitialState: function () {
        return { name: '小明' };
    },

    componentDidMount() {
        console.log('App');
    },

    render() {
        return <div>{this.state.name}</div>;
    },
});

export default <App />;
