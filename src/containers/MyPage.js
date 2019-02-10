import React, { Component } from 'react';
import { withRouter } from 'react-router';

class MyPage extends Component {

    render() {
        return (
            <div>
                this is mypage
            </div>
        );
    }
}

export default withRouter(MyPage);
