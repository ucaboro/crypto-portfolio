import React, {Component} from 'react';
import withAuthentication from './Components/withAuthentication';
import './App.css';

import {auth} from './firebase/firebase.js';

//Importing reusable components
import {Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Navigation from './Components/navbar.js'

import Main from './Containers/Main.js'
import About from './Containers/About.js'
import Account from './Containers/Person.js'
import PasswordForgetPage from './Containers/passwordForget.js'
import SignInPage from './Containers/SignIn.js'
import Register from './Containers/Register.js'

import * as routes from './constants/routes'


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

        <Route exact path={routes.LANDING} component={Main}/>
        <Route exact path={routes.REGISTER} component={Register}/>
        <Route exact path={routes.SIGN_IN} component={SignInPage}/>
        <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage}/>
        <Route exact path={routes.ACCOUNT} component={Account}/>
        <Route exact path={routes.ABOUT} component={About}/>
      </div>
    </Router>);
  }
}

export default  withAuthentication(App);
