import React, { Component } from 'react';
import FeatureCard from '../Components/FeatureCard.js';
import {Grid, Col, Row} from 'react-bootstrap';


export default class Main extends Component {
constructor(){
  super();
  this.state ={
    speed: 10
  }
}

/*componentWillMount(){
  const rootRef = firebase.database().ref('speed');
  rootRef.on('value', snap => {
    console.log('speed is ' + snap.val())
    this.setState({
      speed: snap.val()
    })
  })
}*/

render() {
  return (

    <div className="App">
    <header className="App-header">
      <h1 className="App-title">Manage your Crypto Portfolio the easy way</h1>
    </header>
    <Grid className="Features">
      <Row>
        <Col xs={12} md={12} lg={12}>
          <FeatureCard title="Feature #1" subtitle="Desctiption"/>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <FeatureCard title="Feature #2" subtitle="Desctiption"/>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <FeatureCard title="Feature #3" subtitle="Desctiption" action/>
        </Col>
      </Row>




    <div><p>Database speed: </p>{this.state.speed}</div>
    </Grid>
    </div>

  );
}
}
