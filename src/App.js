import React, { Component } from 'react';
import './App.css';

import Home from './containers/Home';
import Search from './containers/Search';
import Review from './containers/Review';

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
            <Route exact path="/review" component={Review} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
