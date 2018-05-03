import React, {Component} from 'react';
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
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddSign from 'material-ui/svg-icons/content/add';
import AddCryptoCard from '../Components/addCard';
import {db, auth} from '../firebase/firebase';
import {getUserCards, addCard, getAllCards, snapshotToArray, getCoinsInCard} from '../firebase/db';
import CircularProgress from 'material-ui/CircularProgress';


class Account extends Component{

  constructor(props){
    super(props)
  this.state={
    dimmer: '0',
    dimmerHeight: '0%',
    showAddCard: false,
    cardName: '',
    cards: '',
    cardLoaded: false,
    coins: []
  }
  this.addNewCard = this.addNewCard.bind(this)
  this.createNewCard = this.createNewCard.bind(this)
  this.changeCardName=this.changeCardName.bind(this)
  this.removeDimmer = this.removeDimmer.bind(this)
  }

  componentWillMount(){
    const userCards = db.ref().child(auth.currentUser.uid);
    let allCards =''
          userCards.on('value', snap => {
      let cards =  snapshotToArray(snap);
      this.setState({
        cards
      })

      let coins = []
          for (let i=0; i<cards.length; i++){
            let cardCoins = userCards.child(this.state.cards[i].key)
           cardCoins.on('value', snap => {
             coins.push(snap.val())
           })
          }
          this.setState({
            coins: snap.val()
          })


          let k  = this.state.coins
          //way to iterate through the objects k.cardId.coinId.paramater
          console.log(k['-LBXXO5rXVjuU9UuZLSq']['-LBad4UE0vk01VzTi6c7'].coin)


    });





  }

  componentDidMount(){
    this.setState({cardLoaded: true})

  }




  changeCardName(e){
    this.setState({
      cardName: e.target.value
    })
  }

  onEnter = (e) =>{
      if(e.key === 'Enter'){
        this.createNewCard()
    }
  }

removeDimmer(){
  this.setState({
    dimmer: '0',
    dimmerHeight: '0%',
    showAddCard: false,
    cardName: ''
  })
}

createNewCard(){

//condition to ensure the card name is entered
if(this.state.cardName.length!=0){
  addCard(auth.currentUser.uid, this.state.cardName)

  this.setState({
    dimmer: '0',
    dimmerHeight: '0%',
    showAddCard: false,
    cardName: ''
  })
} else {
  alert('you need to create a name for the card')
}


}

 addNewCard(){
  this.setState({
    dimmer: '0.7',
    dimmerHeight: '100%',
    showAddCard: true
  })
  }





  render(){

    return(
      <div>
      <div onClick = {this.removeDimmer} className= "pageDimmer" style={{opacity: this.state.dimmer, height: this.state.dimmerHeight}}/>
      <Person
        onAddCircleClick={this.addNewCard}
        showAddCard={this.state.showAddCard}
        onCreateClick={this.createNewCard}
        changeCardName = {this.changeCardName}
        cards = {this.state.cards}
        onKeyPress = {this.onEnter}
        cardLoaded = {this.state.cardLoaded}

        />
      </div>
    )
  }
}

const AvatarStyle = {
  border: 0,
  objectFit: 'cover',
}

let Profit = 0;
let Invested = 0;

function formatProfit(num1, num2){
  let profit = num1 - num2;
  if (profit>0){
    return "+"+profit+ " $"
  }else{
    return "-"+profit+' $'
  }

}

function calculateOverallInvestment(obj, prop){
  let sum = 0;
  for(let i=0; i<obj.length; i++){
    sum=sum+obj[i][prop];
  }

  if(prop==="investment"){
    Invested = sum;
  } else {
    Profit = sum;
  }

  return sum;
}



class Person extends Component{
  constructor(props, {authUser}){
  super(props, {authUser})

}



render(){
  let plusIcon = ''
  let coins = ''
  let cards = []
  let list = this.props.cards;
  for (let value of list){
    cards.push(<CryptoCard
      key={value.key}
      cardKey={value.key}
      frontTitle={value.name}
      />)
  }

//setting up logic for plusIcon to appear only after cards are loaded
  if(cards.length!=0){
    plusIcon = (    this.props.showAddCard ?
          <AddCryptoCard changeCardName = {this.props.changeCardName} onKeyPress={this.props.onKeyPress} onCreateClick={this.props.onCreateClick}/>
          :
          <AddCryptoCardButton onAddCircleClick={this.props.onAddCircleClick}/>
      )
  }

  let loader = <Col md={12}><CircularProgress/></Col>

  return(
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
          <AccountTable
            column1="Investment"
            column2="Coin"
            column3="Amount"
            mappedRows="investment"
            tableData={investData}/>
          <h5 className='text-center'>{calculateOverallInvestment(investData, 'investment')} $</h5>

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
          <Row>
            <Col md={8} lg={8} sm={8} xs={8}>
              <h4 className="portfolioTitle">Portfolio</h4>
            </Col>

            <Col md={4} lg={4} sm={4} xs={4}>
              <Chip style={{marginTop:'5px', marginBottom: '5px'}}>
                {formatProfit(calculateOverallInvestment(profitData, 'currentValue'),Invested)}
              </Chip>
            </Col>
          </Row>

            <AccountTable
              column1="Coin"
              column2="Amount"
              column3="Current value"
              mappedRows="profit"
              tableData={profitData}/>

            <h5 className="text-center">
              {Profit} $
            </h5>

        </div>
      </Col>

    </Row>

    {/*
    <Row>
    <ExpandableCoinList/>
    </Row>
    */}


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
    <CryptoCard  tableData={cardData2} priceChange="213$" frontTitle="tracking"/>

    {cards.length===0 ? loader : cards }

    {plusIcon}






    </Row>

    <Row>
      <h1>Account: {auth.currentUser.email} </h1>
      <p>The Account Page is accessible by every signed in user.</p>
      < PasswordForgetPage />
    </Row>





    </div>
  )
    }

}







const AddCryptoCardButton = (props) =>
<Col md={4}>
  <FloatingActionButton onClick={props.onAddCircleClick} backgroundColor='#1e5799' className="addCardButton">
    <AddSign/>
  </FloatingActionButton>
</Col>


const profitData = [
  {
    coin: 'BTC',
    amount: '0.5',
    currentValue: 1000
  },
  {
    coin: 'ETH',
    amount: '1.5',
    currentValue: 1000
  },
  {
    coin: 'LTC',
    amount: '2.5',
    currentValue: 1000
  },
  {
    coin: 'EOS',
    amount: '100',
    currentValue: 1254
  },

];

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
export default withAuthorization(authCondition)(Account);
