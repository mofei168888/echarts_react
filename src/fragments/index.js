import React from 'react';

class Columns extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div>Hello</div>
                <div>World</div>
            </React.Fragment>
        );
    }
}

// class Columns extends React.Component {
//     render() {
//         return [<div key="A">Hello</div>, <div key="B">World</div>];
//     }
// }

export default <Columns />;
