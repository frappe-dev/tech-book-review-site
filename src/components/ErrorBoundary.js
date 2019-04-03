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
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }

    render() {
        if (this.state.errorInfo) {
            let errorMessage = "";
            // errorInfoを改行で分けた時の3番目の要素にエラーが起きたコンポーネント名が入っている
            let errorComponent = this.state.errorInfo.componentStack.split(/(\r\n|\n)/g)[2];
            if (errorComponent.includes("Card")) {
                errorMessage = "書籍の情報取得に失敗しました。";
            } else {
                errorMessage = "ページの表示に失敗しました。ホームから再度アクセスしてください。";
            }
            return (
                <h2>{ errorMessage }</h2>
            );
        }
        // Normally, just render children
        return this.props.children;
    }  
}

export default ErrorBoundary;