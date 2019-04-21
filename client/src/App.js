import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; //Link
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './utils/setAuthToken';
import { setUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';
import './styles/main.sass';

//test
import Header from './components/layout/Header';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Main from './components/Main/Main';
import Error from './components/Error/Error';
import User from './components/user/User';
import Edit from './components/user/Edit';
import CreatePost from './components/posts/CreatePost';
import Post from './components/posts/Post';

//Check for token
if (localStorage.token) {
  // Set token
  setAuthToken(localStorage.token);
  // Decode token
  const decoded = jwt_decode(localStorage.token);
  // Set user
  store.dispatch(setUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <main className="container">
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/user/:id" component={User} />
                <Route exact path="/edit-user" component={Edit} />
                <Route exact path="/create" component={CreatePost} />
                <Route exact path="/post/:id" component={Post} />
                <Route exact path="/contacts" component={() => <p>contacts</p>} />
                <Route exact path="/search" component={() => <p>search</p>} />
                <Route component={Error} />
              </Switch>
            </main>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
