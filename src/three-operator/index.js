import React from 'react';

const Button = (props) => {
    const { kind, ...other } = props;

    const className = kind === 'primary' ? 'PrimaryButton' : 'SecondaryButton';
    return <button className={className} {...other} />;
};

const App = () => {
    return (
        <div>
            <Button kind="primary" onClick={() => console.log('clicked!')} type="submit">
                Hello World!
            </Button>
        </div>
    );
};

export default <App />;
