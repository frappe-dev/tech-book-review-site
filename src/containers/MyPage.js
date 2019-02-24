import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class MyPage extends Component {

    render() {
        return (
            <div>
				<h2>This is mypage</h2>
				<h2>Your userID is XX</h2>
				<Link to={{
					pathname: "/mypage/record",
				}}>
					<Button variant="contained" color="secondary">
						お気に入り・レビュー一覧
					</Button>
				</Link>
            </div>
        );
    }
}

export default withRouter(MyPage);
