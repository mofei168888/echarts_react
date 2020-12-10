import React from 'react';

function Dialog(props) {
    return (
        <div>
            <div>title</div>
            <div>{props.children}</div>
        </div>
    );
}

function WelcomeDialog() {
    return (
        <Dialog>
            <div>test555</div>
        </Dialog>
    );
}

class App extends React.Component {
    render() {
        return (
            <div>
                <WelcomeDialog />
            </div>
        );
    }
}

export default <App />;
