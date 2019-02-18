import React, { Component } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';

Amplify.configure({
    Auth: {
        //identityPoolId: 'ap-northeast-1:407889927237',
        IdentityPoolId: 'ap-northeast-1:c8f5e6c7-ddd4-4b0b-99e0-e333f36255f0',
        region: 'ap-northeast-1', // REQUIRED - Amazon Cognito Region
        userPoolId: 'ap-northeast-1_2cQ2zYveA', //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: '32amgj3pul4ol7i7ovgqeo5pu9', //OPTIONAL - Amazon Cognito Web Client ID
    }
});

class Login extends Component {
    async componentDidMount() {
        console.log("Auth: ");
        console.log(Auth.currentAuthenticatedUser());
        await Auth.currentUserInfo()
            .then(data => console.log(data))
            .catch(err => console.log(err))
    } 

    render() {
        const federated = {
            google_client_id: '641757103744-pbhruvj75801k923hfbeq91h7ttninj3.apps.googleusercontent.com', 
        };    
        return <Authenticator federated={federated}/>
    }    
}

export default Login;