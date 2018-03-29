import React from 'react';
import withAuthorization from '../Components/withAuthorization';
import PropTypes from 'prop-types';
import  PasswordForgetPage  from './passwordForget';
import {Row, Col, Grid} from 'react-bootstrap';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import CryptoCard from '../Components/card';
import ExpandableCoinList from '../Components/expandableCoinList';
import AccountTable from '../Components/accountTable';
import Divider from 'material-ui/Divider';


const AvatarStyle = {
  border: 0,
  objectFit: 'cover',
}

function calculateOverallInvestment(obj){
  let sum = 0;
  for(let i=0; i<obj.length; i++){
    sum=sum+obj[i].investment;
    console.log(sum)
  }

  return sum;
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
      <h4>Invested</h4>
      <AccountTable tableData={investData}/>
      <Divider/>
      <h5 className='investAmount'>={calculateOverallInvestment(investData)} $</h5>

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

<CryptoCard
  tableData={cardData}
  priceChange="1,000$"
  frontTitle="COINBASE"
  backGraph="Graph on the back of the card 📈"/>

<CryptoCard  tableData={cardData2} priceChange="734$" frontTitle="binance"/>
<CryptoCard  priceChange="1,340$" frontTitle="metamask"/>




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

const investData = [
  {
    investment: 1000,
    coin: 'BTC',
    amount: '0.2'
  },
  {
    investment: 500,
    coin: 'ETH',
    amount: '1.3'
  },
  {
    investment: 1000,
    coin: 'EOS',
    amount: '100'
  },
  {
    investment: 250,
    coin: 'LTC',
    amount: '1.2'
  },
  {
    investment: 1250,
    coin: 'LTC',
    amount: '1.2'
  },
  {
    investment: 100,
    coin: 'LTC',
    amount: '1.2'
  },
];

const cardData = [
  {
    coin: 'BTC',
    amount: '0.45',
    value: '10000$'
  },
  {
    coin: 'ETH',
    amount: '12.45',
    value: '8000$'
  },
  {
    coin: 'EOS',
    amount: '115',
    value: '1150$'
  },
  {
    coin: 'LTC',
    amount: '3.12',
    value: '900$'
  },
  {
    coin: 'ADA',
    amount: '98',
    value: '867$'
  },
];

const cardData2 = [
  {
    coin: 'EOS',
    amount: '150',
    value: '10000$'
  },
  {
    coin: 'ETH',
    amount: '18.74',
    value: '8200$'
  },

];



const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Person);
