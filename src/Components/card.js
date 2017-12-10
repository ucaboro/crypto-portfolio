import React, { Component } from 'react';
import {Button, Panel, Grid, Col, Row} from 'react-bootstrap';

export default class CryptoCard extends Component {


  render() {
    return (
       <div className='cryptoCard'>

       <div className='cryptoLine'>
        <Row className='cryptoLabel'>
           <Col xs={4} md={4}>Label</Col>
           <Col xs={4} md={4}><img height="35px" src="http://uploads.webflow.com/5a2b24419ef2d60001525d50/5a2b24b0911bfa000168f7bd_bitcoin_PNG47.png" className="logo" /></Col>
           <Col xs={4} md={4}>Abbr</Col>
        </Row>
        </div>
        <Row className='cryptoMain'>
           <Col xs={4} md={4}>Inested</Col>
           <Col xs={4} md={4}>Amount</Col>
           <Col xs={4} md={4}>Current Price</Col>
        </Row>
        <Row className='cryptoMain'>
           <Col xs={4} md={4} className="CryptoData">$100</Col>
           <Col xs={4} md={4} className="CryptoData">0.003572</Col>
           <Col xs={4} md={4} className="CryptoData">$13452</Col>
        </Row>
        <Row className='cryptoProfit'>
           <Col xs={12} md={12}>+15.43%</Col>
        </Row>
       </div>

    )
  }
}
