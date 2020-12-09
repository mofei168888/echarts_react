import React from 'react';

class LoggingButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { a: 20 };
    }

    handleClick() {
        console.log('this', this);
    }

    render() {
        return (
            <div>
                {/* this有值 */}
                <button onClick={() => this.handleClick()}>Click me1</button>

                {/* this有值 */}
                <button onClick={this.handleClick.bind(this)}>Click me2</button>

                {/* this为undefined */}
                <button onClick={this.handleClick}>Click me3</button>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return <LoggingButton></LoggingButton>;
    }
}

export default <App />;
