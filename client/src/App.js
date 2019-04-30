import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; //Link
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './utils/setAuthToken';
import { setUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';
import './styles/main.sass';

import Header from './components/layout/Header';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Main from './components/Main/Main';
import Error from './components/Error/Error';
import User from './components/user/User';
import Users from './components/user/Users';
import Edit from './components/user/Edit';
import CreatePost from './components/posts/CreatePost';
import EditPost from './components/posts/EditPost';
import SinglePost from './components/SinglePost/SinglePost';
import Search from './components/Search/Search';
import Contacts from './components/Contacts/Contacts';
import About from './components/About/About';
import Footer from './components/layout/Footer';

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
                <Route exact path="/users" component={Users} />
                <Route exact path="/edit-user" component={Edit} />
                <Route exact path="/create" component={CreatePost} />
                <Route exact path="/edit/:id" component={EditPost} />
                <Route exact path="/post/:id" component={SinglePost} />
                <Route exact path="/contacts" component={Contacts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/search" component={Search} />
                <Route component={Error} />
              </Switch>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
