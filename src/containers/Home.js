import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Home extends Component {
    render() {
        return (
            <div>
                this is home
            
                <h3>検索ページへのリンク</h3>

                <h3>カテゴリ分類ページへのリンク</h3>

                <h3>最新レビュー10件の表示</h3>

                <h3>マイページへのリンク</h3>
            </div>
        );
    }
}

export default withRouter(Home);
