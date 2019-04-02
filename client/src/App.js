import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.sass';

//test
import Home from './components/test/Home';
import About from './components/test/About';
import Error from './components/test/Error';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <p>React</p>
            <Link to="/">home link! </Link>
            <Link to="/about">about link!</Link>
            <hr />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="" component={Error} />
            </Switch>
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
