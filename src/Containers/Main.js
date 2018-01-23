import React, { Component } from 'react';

import firebase from '../firebase.js'

export default class Main extends Component {
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
    <header className="App-header">
      <h1 className="App-title">Manage your Crypto Portfolio the easy way</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <div><p>Database speed: </p>{this.state.speed}</div>
    </div>
  );
}
}
