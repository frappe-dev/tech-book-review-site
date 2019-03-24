import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

//reducer
import SearchReducer from './reducers/SearchReducer';
import ReviewReducer from './reducers/ReviewReducer';
import BookInfoReducer from './reducers/BookInfoReducer';
import BookInfoByBookidReducer from './reducers/BookInfoByBookidReducer';
import UserReviewsReducer from './reducers/UserReviewsReducer';
import UserLikesReducer from './reducers/UserLikesReducer';

//saga
import rootSaga from './saga/rootSaga';

import Amplify from 'aws-amplify';
Amplify.configure({
    Auth: {
        //identityPoolId: 'ap-northeast-1:407889927237',
        identityPoolId: 'ap-northeast-1:c8f5e6c7-ddd4-4b0b-99e0-e333f36255f0',
        region: 'ap-northeast-1', // REQUIRED - Amazon Cognito Region
        userPoolId: 'ap-northeast-1_2cQ2zYveA', //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: '32amgj3pul4ol7i7ovgqeo5pu9', //OPTIONAL - Amazon Cognito Web Client ID
    }
});

const reducer = combineReducers({
    form: reduxFormReducer,
    booksInfo: SearchReducer,
    reviews: ReviewReducer,
    latestBooks: BookInfoReducer,
    specificBook: BookInfoByBookidReducer,
    userReviews: UserReviewsReducer,
    userLikes: UserLikesReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />,
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
