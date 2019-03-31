import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            errorInfo: ""
        };
    }

    componentDidCatch(error, errorInfo) {
        // Display fallback UI
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.log("erroe occured")
    }

    render() {
        if (this.state.error) {
            // Error path
            return (
                <div>
                    <h2> エラーが起きました </h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                    </details>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }  
}

export default ErrorBoundary;