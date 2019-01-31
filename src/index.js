import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'react-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import SearchReducer from './reducers/SearchReducer';
import { getBookList } from './actions/SearchActions'; //for UT

const reducer = combineReducers({
    form: reduxFormReducer,
    bookList: SearchReducer,
});

const store = createStore(
    reducer,
//    applyMiddleware(thunk, logger)
)


//store.dispatch(getBookList('hoge')); //for UT
//console.log(store.getState()); //for UT

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
