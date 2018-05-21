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
import request from 'superagent'


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
    price: []
  }
  this.addNewCard = this.addNewCard.bind(this)
  this.createNewCard = this.createNewCard.bind(this)
  this.changeCardName=this.changeCardName.bind(this)
  this.removeDimmer = this.removeDimmer.bind(this)
  }





async componentDidMount(){
//have to have this for instant update with the db
  const userCards = db.ref().child(auth.currentUser.uid);
          userCards.on('value', snap => {
             let cards = snapshotToArray(snap);
             this.setState({cards})
   });

  let cards = await this.getCardsFromDb()
  let price =  await this.getPrice(cards, 'USD')
  if (price.length!=0 && cards.length!=0){
   this.setState({price, cardLoaded:true})
 }
 }




   getCardsFromDb (){

    return new Promise(function(resolve,reject){
      const userCards = db.ref().child(auth.currentUser.uid);
              userCards.on('value', snap => {
                 let cards = snapshotToArray(snap);

            resolve(cards)
       });
    })
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



getCoinPriceFromSpecificExchange = (coins,e) =>{

}

createNewCard(){

//condition to ensure the card name is entered
if(this.state.cardName.length!=0){
  addCard(auth.currentUser.uid, this.state.cardName)

  this.setState({
    dimmer: '0',
    dimmerHeight: '0%',
    showAddCard: false,
    cardName: '',
  })
} else {
  alert('you need to create a name for the card')
}
}

 addNewCard(){

  this.setState({
    dimmer: '0.7',
    dimmerHeight: '100%',
    showAddCard: true,
  })
  }

  //APIs
    async getPrice(cards, currency) {
   try {

       let coins =  await this.getAllCoinsInString(cards)

       let price =  await this.getCoinPriceFromApi(coins, currency)


       return price



   } catch (e) {
     console.error(e);
   }
 }

 async getCoinPriceFromApi   (coins, currency)   {
   let price = []
   try {

 await request
 .get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coins}&tsyms=${currency}`)
 .type('json')
 .then( function(res){
   console.log('price retirieving..')
   price.push( res.body)
   //response = Object.keys(res.body)
 })

 } catch(err){
   console.error(err.message)
 }
return price[0]
}



  getCoinAbbr = (coinFullName) =>{
    //conditionals for parcing just the coin code in brackets
    let regExp = /\(([^)]+)\)/
    let matches = regExp.exec(coinFullName)

    return matches[1]
  }


  getAllCoinsInString = (cards) => {

  let cardsObject = Object.values(cards)
  let coinsInArray = []
  let parsedCoin = ''

  //conditionals for parcing just the coin code in brackets
  let regExp = /\(([^)]+)\)/


  //practicing alternative for loop
  for(let value of cardsObject){

    for (let coinValues of Object.values(value)){
      //excluding undefined and blank
      if(coinValues.coin!=''&&coinValues.coin!=undefined){
         parsedCoin = regExp.exec(coinValues.coin)

         coinsInArray.push(parsedCoin[1])
         //coins.push(parsedCoin[1])


    }
      //need to pard for everything that is in brackets if brackets exist
    }
  }
  let unique = [ ...new Set(coinsInArray) ]
  //console.log(unique)
  return unique.toString()



}





 pushCoinsToCard = (value, price) =>{
  //🎁 cardKey = cardCoins.length-1
  //🎁 cardName = cardCoins.length-2
  //🎁 value.key = key of the card
  //🎁 value.name = name of the card
//console.log(Object.keys(price))

  //creating an object of cards+coins to iterate through
  let cardCoins = Object.values(value)

  //retrieving the price from the API
  //let coins = this.getAllCoinsInString()
  //let price = this.getCoinPriceFromApi(coins, 'USD')

  //the last 2 objects are card name and a key, so exclude those through iteration (as only coins needed)
  for (let n=0; n<cardCoins.length-2;n++){

    //if the card name is the same push the coins to the card
    if(cardCoins[cardCoins.length-1]===value.key){

      //console.log(cardCoins[n])
      cardData.push(cardCoins[n])
        if(Object.keys(price).includes(this.getCoinAbbr(cardCoins[n].coin))){
          cardData[n]['value'] = Object.values(price[this.getCoinAbbr(cardCoins[n].coin)]).toString()
          console.log('price attached to '
          + this.getCoinAbbr(cardCoins[n].coin)
          +' '+Object.values(price[this.getCoinAbbr(cardCoins[n].coin)]))
        }


    }
  }
  //console.log("👆🏻 pushed to " + value.name)

}





    createCardComponent = () => {
    let list =  this.state.cards
    let price =  this.state.price
    let cards = []
    //console.log(list.length)
  for (let value of list){
      this.pushCoinsToCard(value, price)

      //creating a card component
      cards.push(<CryptoCard
        key={value.key}
        cardKey={value.key}
        frontTitle={value.name}
        tableData={cardData}
        />)


      //erasing coins from card for the next card push
      cardData = []
  }
return cards
}





  render(){

if(this.state.price.length!=0){

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
        createCardComponent ={this.createCardComponent}
        />
      </div>
    )}else{return loader}

}
}





let cardData = [];
let loader = <Col md={12}><CircularProgress/></Col>
let coins = []
//let cards =[]


class Person extends Component{
  constructor(props, {authUser}){
  super(props, {authUser})

}








calculateCoinsAmount = () =>{
  let cards = Object.values(this.state.cards)
  let countCoins = 0
  for (let i=0; i<cards.length; i++){
      countCoins=countCoins+Object.keys(cards[i]).length-2
  }
  return countCoins
}





render(){




console.info('RENDERED')
//generating cards and coins
let plusIcon = ''
let list = this.props.cards;
console.info(list)


let cards = this.props.createCardComponent()

console.log(cards)







//setting up logic for plusIcon to appear only after cards are loaded
  if(this.props.cardLoaded){
    plusIcon = (    this.props.showAddCard ?
          <AddCryptoCard changeCardName = {this.props.changeCardName} onKeyPress={this.props.onKeyPress} onCreateClick={this.props.onCreateClick}/>
          :
          <AddCryptoCardButton onAddCircleClick={this.props.onAddCircleClick}/>
      )
  }




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



{/*    <CryptoCard
      tableData={cardData}
      priceChange="1,000$"
      frontTitle="COINBASE"
      backGraph="Graph on the back of the card 📈"/>

    <CryptoCard  tableData={cardData2} priceChange="734$" frontTitle="binance"/>
    <CryptoCard  tableData={cardData2} priceChange="213$" frontTitle="tracking"/>*/}

    {/*cards.props.map((value) => <p>value</p>)*/}

    {this.props.cardLoaded ? cards : loader}

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




const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Account);
