import React, { Component } from 'react';
//import Amplify, { Auth } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';

// header
import AppHeader from '../components/AppHeader';

class Login extends Component {
    async componentDidMount() {
        console.log("Auth: ");
        console.log(Auth.currentAuthenticatedUser());
        await Auth.currentUserInfo()
            .then(data => console.log(data))
            .catch(err => console.log(err))
    } 
    //cf. https://aws-amplify.github.io/docs/js/authentication
    //TODO: 電話番号入力を消す
    render() {
        const federated = {
            google_client_id: '641757103744-pbhruvj75801k923hfbeq91h7ttninj3.apps.googleusercontent.com', 
            facebook_app_id: '2309758615736478',
        };    
        return (
            <div>
                <AppHeader/>
                <Authenticator federated={federated}/>
            </div>
        );
    }    
}

export default Login;

/*
MEMO

https://tech.fusic.co.jp/cloud/react-authentication-cognito/

diff --git a/src/containers/Home.js b/src/containers/Home.js
index 7775e9b..b4059be 100644
--- a/src/containers/Home.js
+++ b/src/containers/Home.js
@@ -3,6 +3,16 @@ import { withRouter } from 'react-router';
 import Button from '@material-ui/core/Button';
 import { withStyles } from '@material-ui/core/styles';
 
+import {
+  withAuthenticator,
+  ConfirmSignIn,
+  ConfirmSignUp,
+  ForgotPassword,
+  SignUp,
+  VerifyContact
+} from 'aws-amplify-react';
+import Login from './Login'; 
+
 const styles = theme => ({
 	margin: {
 		margin: theme.spacing.unit,
@@ -66,4 +76,11 @@ class Home extends Component {
 	}
 }
 
-export default withRouter(withStyles(styles)(Home));
+export default withRouter(withStyles(styles)(withAuthenticator(Home, false, [
+	<Login />,
+	<ConfirmSignIn />,
+	<VerifyContact />,
+	<SignUp />,
+	<ConfirmSignUp />,
+	<ForgotPassword />,
+])));


*/

