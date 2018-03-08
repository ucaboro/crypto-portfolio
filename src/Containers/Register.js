import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';

import {firebase, provider, auth } from '../firebase/index.js';

import {Form, FormGroup, FormControl, ControlLabel, Checkbox, Button, Col} from 'react-bootstrap'
import Person from './Person.js'

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const SignUpPage = ({ history }) =>
  <div>
    <h1>SignUp</h1>
    <Register history={history} />
  </div>


class Register extends Component{
  constructor(props){
    super(props);
    this.state = {...INITIAL_STATE};
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
  }

onSubmit = (event) => {
event.preventDefault();

const {
  username,
  email,
  passwordOne
} = this.state;

const {
  history
} = this.props;

auth.doCreateUserWithEmailAndPassword(email, passwordOne)
.then(authUser => {
  this.setState(()=> ({...INITIAL_STATE}))
  history.push(routes.ACCOUNT)
})
.catch(error=>{
  this.setState(byPropKey('error', error))
})


}

logout() {
  auth.signOut()
   .then(() => {
     this.setState({
       user: null
     });
   });
}
login() {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log(result)
      this.setState({
        user
      });
    });

}

  render(){
    const {
  email,
  passwordOne,
  passwordTwo,
  error,
} = this.state;

const isInvalid =
  passwordOne !== passwordTwo ||
  passwordOne === '' ||
  email === '';

    return(
  <div>
  <Form horizontal>
  <FormGroup controlId="formHorizontalEmail">
    <Col componentClass={ControlLabel} sm={2}>
      Email
    </Col>
    <Col sm={10}>
      <FormControl value={email}
        type="email"
        placeholder="Email"
        onChange = {event => this.setState(byPropKey('email',event.target.value))} />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalPassword">
    <Col componentClass={ControlLabel} sm={2}>
      Password
    </Col>
    <Col sm={10}>
      <FormControl value={passwordOne}
         type="password"
         placeholder="Password"
         onChange = {event => this.setState(byPropKey('passwordOne', event.target.value))} />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalPassword2">
    <Col componentClass={ControlLabel} sm={2}>
      Password
    </Col>
    <Col sm={10}>
      <FormControl value={passwordTwo}
         type="password"
         placeholder="Confirm Password"
         onChange = {event => this.setState(byPropKey('passwordTwo', event.target.value))} />
    </Col>
  </FormGroup>

  <FormGroup>
    <Col smOffset={2} sm={10}>
      <Checkbox>Remember me</Checkbox>
    </Col>
  </FormGroup>

  <FormGroup>
    <Col smOffset={2} sm={10}>
      <Button
      onClick = {this.onSubmit}
      disabled = {isInvalid}
      type="submit">Sign Up
      </Button>
      {error && <p>{error.message}</p>}
    </Col>
  </FormGroup>
</Form>



<div className="wrapper">
  <h1>Fun Food Friends</h1>
  {this.state.user ?
    <button onClick={this.logout}>Log Out</button>
    :
    <button onClick={this.login}>Log In</button>
  }
</div>

{this.state.user ?
   <div>
     <div className='user-profile'>
       <img src={this.state.user.photoURL} />
     </div>
   </div>
   :
   <div className='wrapper'>
     <p>You must be logged in to see the potluck list and submit to it.</p>
   </div>
 }
</div>
    )
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.REGISTER}>Register</Link>
  </p>

export default withRouter(SignUpPage);
export {
  Register,
  SignUpLink
}
