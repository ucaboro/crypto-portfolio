import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from 'react-bootstrap'

import firebase from './firebase.js'

//Importing reusable components
import CryptoCard from './Components/card.js'
import AppNavbar from './Components/navbar.js'
import Main from './Containers/Main.js'

class App extends Component {
constructor(){
  super();
  this.state ={
    speed: 10
  }
}

componentWillMount(){
  const rootRef = firebase.database().ref('speed');
  rootRef.on('value', snap => {
    console.log('speed is ' + snap.val())
    this.setState({
      speed: snap.val()
    })
  })
}


  render() {
    return (
      <div className="App">
      <AppNavbar/>
      </div>
    );
  }
}


export default App;
