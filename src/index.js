import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//redux
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'react-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

//reducer
import SearchReducer from './reducers/SearchReducer';

const reducer = combineReducers({
    form: reduxFormReducer,
    bookList: SearchReducer,
});

const store = createStore(
    reducer,
//    applyMiddleware(thunk, logger)
)

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
