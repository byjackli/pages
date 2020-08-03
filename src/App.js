import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase, { database } from './config/firebase';
import Loading from './pages/Loading';
import Login from './pages/Login';
import Portal from './pages/Portal';
import Explore from './pages/Explore';
import Admin from './pages/Admin';
import Page from './pages/Page';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pages: <>
        <Route path="/" exact component={Loading} />
        <Route path="/admin" exact component={Login} />
        <Route path="/p/:page" exact component={Page} />
      </>
    }
  }

  componentDidMount() {

    // application authentication (protected pages & page re-direction)
    if (window.location.search) {
      this.confirmSignup();
    }
    this.checkLogin();
  }


  // set registration information (first, last, user, email to database)
  updateServer(user) {
    let data = JSON.parse(localStorage.getItem("create"));
    console.log("user in function", user)

    if (data) {
      database.collection("users").doc(user).set({
        uid: user,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email
      })
        .then(() => {
          localStorage.removeItem("create");
          localStorage.setItem("uid", user.uid);
          window.location.replace("/");
        })
    }
  }

  // confirm registration and create the account on server
  confirmSignup() {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Confirm by re-entering your email.")
      }
      firebase.auth().signInWithEmailLink(email, window.location.href)
        .then(result => {
          localStorage.removeItem("emailForSignIn");
          console.log("before function", result.user.id)
          this.updateServer(result.user.uid);
        });
    }
  }

  // protected routing based on user information
  checkLogin() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        database.collection("users").doc(user.uid).get()
          .then(doc => {
            if (doc.exists) {
              this.setState({
                pages: <>
                  <Route path="/" exact component={Explore} />
                  <Route path="/admin" exact component={Admin} />
                </>,
                user: user
              })
            }
          })
      }
      else {
        this.setState({
          pages: <>
            <Route path="/" exact component={Portal} />
            <Route path="/admin" exact component={Login} />
            <Route path="/explore" exact component={Explore} />
          </>,
        })
      }
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          {this.state.pages}
        </Switch>
      </Router>
    );
  }
}

export default App;
