import React from 'react';
import withAuthorization from '../Components/withAuthorization';
import PropTypes from 'prop-types';
import  PasswordForgetPage  from './passwordForget';
import {Row, Col, Grid} from 'react-bootstrap';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import CryptoCard from '../Components/card';
import ExpandableCoinList from '../Components/expandableCoinList';

const AvatarStyle = {
  border: 0,
  objectFit: 'cover',
}


const Person = (props, {authUser}) =>
<div>
  <header style={{height: '200px'}} className="App-header"/>


  <Row >
    <Col sm={12} mdHidden  lgHidden style={{marginTop: '-195px'}} >
    <Avatar
     src="https://naqyr37xcg93tizq734pqsx1-wpengine.netdna-ssl.com/wp-content/uploads/2016/01/76-Intelligent-Richard-Branson-Quotes.jpg"
     size={100}
     style={AvatarStyle}
      />
    </Col>
  </Row>

<Row style={{marginTop: '-95px'}}>
  <Col lg={5} md={4} sm={6} className='InvestedSheetCol'>
    <div className='card card-1'>
      <p>Invested</p>
    </div>
  </Col>

  <Col xsHidden smHidden lg={2} md={4} className='AvatarCol'>

    <Avatar
     src="https://naqyr37xcg93tizq734pqsx1-wpengine.netdna-ssl.com/wp-content/uploads/2016/01/76-Intelligent-Richard-Branson-Quotes.jpg"
     size={200}
     style={AvatarStyle}
      />

  </Col>

  <Col   lg={5} md={4} sm={6} className='ProfitSheetCol'>
    <div className='card card-1'>
      <p>Profit</p>
    </div>
  </Col>

</Row>

<Row>
<ExpandableCoinList/>
</Row>

<Row>
<h3>Your Cards 💵 </h3>
</Row>

<Row>

<CryptoCard/>
<CryptoCard/>
<CryptoCard/>


</Row>

<Row>
  <h1>Account: {authUser.email} </h1>
  <p>The Account Page is accessible by every signed in user.</p>
  < PasswordForgetPage />
</Row>




</div>

Person.contextTypes = {
  authUser: PropTypes.object,
};




const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Person);
