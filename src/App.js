import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase, { database } from './config/firebase';
import Portal from './pages/Portal';
import Home from './pages/Home';
import Admin from './pages/Admin';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pages: <>
        <Route path="/" exact component={Portal} />
        <Route path="/admin" exact component={Admin} />
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
  updateServer(user){
    database.collection("users").doc(user).set()
  }

  // confirm registration and create the account on server
  confirmSignup() {
    console.info("confirming");
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Confirm by re-entering your email.")
      }
      firebase.auth().signInWithEmailLink(email, window.location.href)
        .then(result => {
          localStorage.removeItem("emailForSignIn");
          localStorage.setItem("user", JSON.stringify(result.user));
          window.location.replace("/");
        })
    }
  }

  // protected routing based on user information
  checkLogin() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        database.collection("users").doc(user.uid).get()
          .then(doc => {
            if (!doc.exists) {
              this.setState({
                pages: <Route path="/" exact component={Portal} />,
                user: user
              })
            }
            else {
              this.setState({
                pages: <>
                  <Route path="/" exact component={Home} />
                  <Route path="/admin/:page" exact component={Admin} />
                </>,
                user: user
              })
            }
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
