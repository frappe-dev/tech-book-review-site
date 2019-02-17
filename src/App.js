import React, { Component } from 'react';
import './App.css';

// container
import Home from './containers/Home';
import Search from './containers/Search';
import BookInfo from './containers/BookInfo';
import Category from './containers/Category';
import MyPage from './containers/MyPage'
import Review from './containers/Review'
import BookList from './containers/BookList'

// Route関連
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// 不明なRouteは全てNotFound
const NotFound = () => {
	return(
		<h2>ページが見つかりません</h2>
	)
}

class App extends Component {
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/search" component={Search} />
						<Route exact path="/category" component={Category} />
						<Route exact path="/bookinfo/:id" component={BookInfo} />
						<Route exact path="/bookinfo/:id/review" component={Review} />
						<Route exact path="/mypage" component={MyPage} />
						<Route exact path="/mypage/booklist" component={BookList} />
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
