import React from 'react';

const FancyButton = React.forwardRef((props, ref) => {
    return (
        <button ref={ref} className="FancyButton">
            {props.children}
        </button>
    );
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ref: React.createRef(),
        };
    }

    componentDidMount() {
        console.log(this.state.ref.current);
    }

    render() {
        return <FancyButton ref={this.state.ref}>Click me!</FancyButton>;
    }
}

export default <App />;
