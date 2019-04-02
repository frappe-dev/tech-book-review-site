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
        // errorInfoを改行で分けた時の3番目の要素にエラーが起きたコンポーネント名が入っている
        let errorComponent = errorInfo.componentStack.split(/(\r\n|\n)/g)[2];
        this.setState({
            error: error,
            errorInfo: errorInfo,
            errorComponent: errorComponent,
        });
    }

    render() {
        if (this.state.error) {
            let errorMessage = "";
            if (this.state.errorComponent) {
                if (this.state.errorComponent.includes("Card")) {
                    errorMessage = "書籍の情報取得に失敗しました";
                } else {
                    errorMessage = "ページの表示に失敗しました\nホームから再度アクセスしてください";
                }
            }
            return (errorMessage.split(/(\r\n|\n)/g).map((line, i) => {
                return line.match(/(\r\n|\n)/g) ? <br key={i} /> : line
            }));
        }
        // Normally, just render children
        return this.props.children;
    }  
}

export default ErrorBoundary;