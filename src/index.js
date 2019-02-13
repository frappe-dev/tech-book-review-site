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

//saga
import rootSaga from './saga/rootSaga';

const reducer = combineReducers({
    form: reduxFormReducer,
    bookList: SearchReducer,
    reviews: ReviewReducer,
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
