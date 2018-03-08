import React, {Component} from 'react';

import './App.css';
import {Button} from 'react-bootstrap'

import {firebase, auth, provider} from './firebase/firebase.js';

//Importing reusable components
import CryptoCard from './Components/card.js'
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Navigation from './Components/navbar.js'

import Main from './Containers/Main.js'
import About from './Containers/About.js'
import Person from './Containers/Person.js'
import PasswordForgetPage from './Containers/passwordForget.js'
import SignInPage from './Containers/SignIn.js'
import SignOutPage from './Containers/SignOut.js'
import Register from './Containers/Register.js'

import * as routes from './constants/routes';

const history = createBrowserHistory()

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    }
  }

  componentDidMount() {
  auth.onAuthStateChanged(authUser => {
    authUser
      ? this.setState(() => ({ authUser }))
      : this.setState(() => ({ authUser: null }));
  });

}

  render() {
    return (<Router history={history}>
      <div className="App">
        <Navigation authUser={this.state.authUser}/>

        <Route exact="exact" path={routes.LANDING} component={Main}/>
        <Route exact="exact" path={routes.REGISTER} component={Register}/>
        <Route exact="exact" path={routes.SIGN_IN} component={SignInPage}/>
        <Route exact="exact" path={routes.PASSWORD_FORGET} component={PasswordForgetPage}/>
        <Route exact="exact" path={routes.ACCOUNT} component={Person}/>
        <Route exact="exact" path={routes.ABOUT} component={About}/>
      </div>
    </Router>);
  }
}

export default App;
