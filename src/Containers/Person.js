import React from 'react';
import withAuthorization from '../Components/withAuthorization';
import PropTypes from 'prop-types';
import  PasswordForgetPage  from './passwordForget';


const Person = (props, {authUser}) =>

  <div>
    <h1>Account: {authUser.email} </h1>
    <p>The Account Page is accessible by every signed in user.</p>
    < PasswordForgetPage />
  </div>

Person.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Person);
