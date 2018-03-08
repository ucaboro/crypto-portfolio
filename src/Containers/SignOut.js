import React from 'react';

import { auth } from '../firebase';


const SignOutButton = () =>
  <a onClick={auth.doSignOut}>
    Sign Out
  </a>

export default SignOutButton;
