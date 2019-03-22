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

    signOut() {
	const { onStateChange } = this.props;
	Auth.signOut().then(() => {
            onStateChange('signedOut');
	});
    }

    render() {
        return (
            <div>
				<AppHeader/>
				<h2>This is mypage</h2>
				<h2>Your userID is XX</h2>
				<Link to={{
					pathname: "/mypage/record",
				}}>
					<Button variant="contained" color="secondary">
						お気に入り・レビュー一覧
					</Button>
				</Link>

	    <button onClick={()=>this.signOut()}>ログアウト</button>
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
