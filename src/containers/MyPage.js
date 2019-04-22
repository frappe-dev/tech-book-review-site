import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import {
	withAuthenticator,
	ConfirmSignIn,
	ConfirmSignUp,
	ForgotPassword,
	SignUp,
	VerifyContact
} from 'aws-amplify-react';
import Login from './Login';

// header
import AppHeader from '../components/AppHeader';

//cf. https://qiita.com/oliverSI_/items/ffb73c9ae76ab2382bef

class MyPage extends Component {
	constructor(props) {
		super(props);
		this.setState.bind(this);
		this.state = {
			userID: "",
		};
	}

	signOut() {
		const { onStateChange } = this.props;
		Auth.signOut().then(() => {
			onStateChange('signedOut');
		});
	}

	async componentDidMount() {
		let userID = "";
		await Auth.currentAuthenticatedUser()
			.then(data => {
				if ("id" in data) {
					userID = data.id;
				} else if ("attributes" in data && "sub" in data.attributes) {
					userID = data.attributes.sub;
				} else {
					console.log("[ERROR]cannot parse userID"); // -> TODO: error throw
				}
				this.setState({
					isAuthenticated: true,
					userID: userID,
				});
				console.log(data);
			}).catch(err => {
				this.setState({ isAuthenticated: false });
				console.log(err);
			})
	}

	render() {
		return (
			<div>
				<AppHeader />
				<h3>マイページ</h3>

				<h4>以下のボタンからレビュー、気になるの履歴を確認することが出来ます。</h4>
				<Link to={{
					pathname: "/mypage/record",
					state: {
						userID: this.state.userID,
					}
				}}>
					<Button variant="contained" color="secondary">
						お気に入り・レビュー一覧
					</Button>
				</Link>

				<button onClick={() => this.signOut()}>ログアウト</button>
			</div>
		);
	}
}

// loginをUT環境でしたくない場合は、下のfalseをtrueにすれば多分大丈夫
export default withRouter(withAuthenticator(MyPage, false, [
	<Login />,
	<ConfirmSignIn />,
	<VerifyContact />,
	<SignUp />,
	<ConfirmSignUp />,
	<ForgotPassword />,
]));
