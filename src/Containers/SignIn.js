import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import { SignUpLink } from './Register';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import TextField from 'material-ui/TextField';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import {blue500, red500} from 'material-ui/styles/colors';


const SignInPage = ({ history }) =>
  <div>
    <br/>
    <br/>
    <SignInForm history={history} />

  </div>

  const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }


  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.ACCOUNT);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
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
                        value={password}
                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                        type="password"
                      />
                    { error && <p style={styles.errorStyle}>{error.message}</p> }
                    </form>
                </CardText>
                <CardActions>
                     <RaisedButton buttonStyle={{width: '250px'}} backgroundColor='#42a5f5' disabled={isInvalid} onClick={this.onSubmit} label="Sign In" labelColor='white'/>
                </CardActions>
                    <SignUpLink />
                    <br/>
              </Card>
             </Col>


    </Grid>
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




export default withRouter(SignInPage);

export {
  SignInForm,
};
