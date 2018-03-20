import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';

import { provider, auth } from '../firebase/index.js';
import Checkbox from 'material-ui/Checkbox';

import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import {blue500, red500} from 'material-ui/styles/colors';

const INITIAL_STATE = {
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
    <br/>
    <br/>
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
      <Grid>
        <Col xs={0} md={3}></Col>
            <Col xs={12} md={6} lg={6}>
              <Card className="SignInCard">
                <CardText>
                    <form onSubmit={this.onSubmit}>
                      <TextField
                        floatingLabelText="Email"
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                      />
                    <br/>
                      <TextField
                        floatingLabelText="Password"
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        value={passwordOne}
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        type="password"
                      />
                    <br/>
                      <TextField
                        floatingLabelText="Confirm Password"
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineStyle}
                        value={passwordTwo}
                        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                        type="password"
                      />
                    { error && <p style={styles.errorStyle}>{error.message}</p> }
                    </form>
                </CardText>
                <CardActions>
                     <RaisedButton buttonStyle={{minWidth: '250px'}} backgroundColor='#42a5f5' disabled={isInvalid} onClick={this.onSubmit} label="Sign Up" labelColor='white'/>
                     <br/>
                     <Checkbox iconStyle={{fill:'#2196F3', marginLeft: '-10px',}} style={{marginLeft: '33%', marginTop:'10px'}} labelStyle={{width: '100px', color: '#2196F3'}} label="Remember me"/>
            </CardActions>
              </Card>
             </Col>
    </Grid>

     //<img alt="ava" src={this.state.user.photoURL} />

    );
  }
}
const styles = {
  errorStyle: {
    color: red500,
  },
  underlineStyle: {
    borderColor: blue500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
};


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
