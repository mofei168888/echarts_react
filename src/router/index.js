import React, { Suspense } from 'react';

const About = React.lazy(
    () =>
        new Promise((resolve) =>
            setTimeout(
                () =>
                    resolve(
                        // 模拟ES Module
                        {
                            // 模拟export default
                            default: function render() {
                                return <div>About</div>;
                            },
                        }
                    ),
                1000
            )
        )
);

class MyComponent extends React.Component {
    render() {
        return (
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <About />
                </Suspense>
            </div>
        );
    }
}

export default <MyComponent />;
