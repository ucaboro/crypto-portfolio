import React, { Component } from 'react';
import { firebase, auth, provider } from '../firebase/firebase.js';

export default class Person extends Component{
  constructor(props){
    super(props)
  }

isAuthenticated(){
//
}

render(){
console.log(firebase.auth())
  return(
  <div>
    <h3>ID: {this.props.match.params.id}</h3>
  </div>
)
}
}
