import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {db, auth} from '../firebase/firebase';
import {deleteOneCard, addCoinToCardId, getCoinsInCard, updateCoinsInCardId} from '../firebase/db';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import AddCoin from '../Components/addCoin'
import Snackbar from 'material-ui/Snackbar';




  const ChipStyles = {
    chip: {
      margin: '15px 0 0 0',
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };

export default class CryptoCard extends Component{
  constructor(props){
    super(props);
    this.state ={
      flipped: '',
      toggledCardId: '',
      openModal: false,
      loaded: false,
      openAddCoin: false,
      //used for add coin modal dialog
      coin:'',
      amount:'',
      exchange: '',
      invested: '',

      snackbarOpen: false,
      snackbarMessage: '',
    }
    this.flipCardOnClick = this.flipCardOnClick.bind(this)
  }

  onAddCoinClick = (e) =>{
    const buttonText = e.target
    const buttonContainer = buttonText.parentElement.parentElement
    const cardId = (buttonContainer.id.length>0 ? buttonContainer.id : buttonText.parentElement.id)

    this.setState({openAddCoin: true, toggledCardId: cardId})
    console.log('cardId toggled: ' + cardId)

    //need to retrieve all coins from that card for comparison


  }

  closeAddCoin = () =>{
    this.setState({openAddCoin: false})
  }

  //getting addCoin values

  getCoin = (text) => {
    this.setState({coin: text})
  }


  getAmount = (e) =>{
    this.setState({amount: e.target.value})
  }

  getExchange = (text) =>{
    this.setState({exchange: text})
  }

  getInvested = (e) =>{
    this.setState({invested: e.target.value})
      }

  handleRequestClose = () => {
        this.setState({
          snackbarOpen: false,
        });

      };

  addCoinToCard = () =>{
    let cardId = this.state.toggledCardId
    let coin = this.state.coin
    let amount = this.state.amount
    let exchange = this.state.exchange
    let invested = this.state.invested
    //console.log(cardId +" " +coin +' ' + amount + ' ' + exchange + ' ' + invested)
    //need to check card key and compare whether the newly added card already expandableList

      /*
        1 get card's key
        2 .includes(newCoinAbr)
        3 if exist  - function to add up amount and invested
        4 if doesn't exist - add addCoinToCardId
      */
      let allCardCoins = []
        const coinsInCard = getCoinsInCard(cardId)
                coinsInCard.on('value', snap => {
                   let coins = snap.val();
                   console.log(coins)
                   allCardCoins = coins
         });

      //let coinsInCard = getCoinsInCard(cardId)
      let coinsArr = []
      for (let i=0; i<Object.values(allCardCoins).length-1;i++ ){
        coinsArr.push(Object.values(allCardCoins)[i].coin)

      }



      if (coinsArr.includes(coin)){
        let newAmount = ''
        let newInvested = ''
        let coinId = ''
        //update invested and amount to merge coins
        for (let i=0; i<Object.values(allCardCoins).length-1;i++ ){
          if(Object.values(allCardCoins)[i].coin === coin){
          newAmount = Number(Object.values(allCardCoins)[i].amount) + Number(amount)
          newInvested = Number(Object.values(allCardCoins)[i].invested) + Number(invested)
          coinId = Object.keys(allCardCoins)[i]
        }
        }

        updateCoinsInCardId(cardId, coinId, newAmount, exchange, newInvested)
        //alert(`👍 ${coin} has been updated in your card`)
        this.setState({
          snackbarOpen: true,
          snackbarMessage: `👍 ${coin} has been updated in your card`
        })
      } else{
        addCoinToCardId(cardId, coin, amount, exchange, invested)
        //alert(`👍 ${coin} has been added to your card`)
        this.setState({
          snackbarOpen: true,
          snackbarMessage: `👍 ${coin} has been added to your card`
        })
      }



    //closing the modal
    this.setState({openAddCoin:false})

    console.log('toggled card id on coin add: ' + cardId)
  }



    closeModal = () => {
      this.setState({openModal: false});
    };

    openModal = () => {
      this.setState({
        openModal: true
      })
    }


  flipCardOnClick(){
    if(this.state.flipped===''){
    this.setState({
      flipped: 'flipped'
    })
  } else {
    this.setState({
      flipped: ''
    })
  }
  }





  onDeleteCardClick = (e) =>{
    //scaling up to get the id of the button in a card
    const buttonText = e.target
    const buttonContainer = buttonText.parentElement.parentElement
    const cardId = (buttonContainer.id.length>0 ? buttonContainer.id : buttonText.parentElement.id) //fixing JS issue with not capturing parent element correctly all the time
    this.setState({toggledCardId: cardId})
    this.openModal()
    console.log(buttonContainer)
    console.log('deleting cardId: ' + cardId)
  }

  deleteCardFromDb = () =>{
    if(this.state.toggledCardId.length!=0){
    deleteOneCard(this.state.toggledCardId)
    console.log('deleting from db cardId: ' + this.state.toggledCardId)
   }
  }

  render(){

    let addCoin = (<AddCoin openAddCoin={this.state.openAddCoin} handleClose={this.closeAddCoin}
       coin={this.getCoin}
       amount={this.getAmount}
       exchange={this.getExchange}
       invested={this.getInvested}
       addCoinToCard={this.addCoinToCard}/>)

    return(


        <Col md={4}>
          <section className="FlipContainer">
            <div id="card" className={this.state.flipped} >
              <CryptoCardFront
                cardKey={this.props.cardKey}
                tableData={this.props.tableData}
                priceChange={this.props.priceChange}
                frontTitle={this.props.frontTitle.toUpperCase()}
                OnFlipButtonClick={this.flipCardOnClick}
                onAddCoinClick={this.onAddCoinClick}


                />
              <CryptoCardBack cardKey={this.props.cardKey} priceChange={this.props.priceChange} backGraph={this.props.backGraph} frontTitle={this.props.frontTitle.toUpperCase()} OnFlipButtonClick={this.flipCardOnClick}  onDeleteCardClick={this.onDeleteCardClick}/>
            </div>
          </section>
          {this.state.openAddCoin ? addCoin : ''}
          <Modal openModal={this.state.openModal} handleClose={this.closeModal} handleDelete={this.deleteCardFromDb}/>

            <Snackbar
      open={this.state.snackbarOpen}
      message={this.state.snackbarMessage}
      autoHideDuration={3000}
      onRequestClose={this.handleRequestClose}
    />
        </Col>

    )
  }
}

 class CryptoCardFront extends Component {
constructor(props){
  super(props);
}

  render() {
    return (



        <Card className='CryptoCardUI front'>

     <CardTitle
       style={{borderRadius: '6px 6px 0 0', color: 'white'}}
       className='CardHeader'>
       <Row>
         <Col md={6} sm={9} lg={6}>
           <p style={{fontSize: '20pt'}}>{this.props.frontTitle}</p>
         </Col>

         <Col md={6} sm={3} lg={6}>
           {this.props.priceChange!=undefined&&this.props.priceChange!=0? <Chip className='center-block'>{this.props.priceChange}</Chip> : ''}
         </Col>
       </Row>

      </CardTitle>

     <CardText style={{padding: '0px'}}>

       <TableExampleComplex tableData={this.props.tableData}/>
     </CardText>
     <CardActions>
       <Divider/>
       <Row>
         <Col md={6} xs={6}>
           <FlatButton label="MORE 📊" onClick={this.props.OnFlipButtonClick} />
         </Col>

         <Col md={3} xs={3}>
           <FlatButton label="SELL" />
         </Col>

         <Col md={3} xs={3}>
           <FlatButton onClick={this.props.onAddCoinClick} id={this.props.cardKey} label="ADD NEW" primary={true} />
         </Col>
       </Row>
     </CardActions>
   </Card>


    )
  }
}


class CryptoCardBack extends Component {



 render() {
   return (



  <Card className='CryptoCardUI back'>

  <CardTitle
  style={{borderRadius: '6px 6px 0 0', color: 'white'}}
  className='CardHeaderBack'>
  <Row>
   <Col md={6} sm={9} lg={6}>
     <p style={{fontSize: '20pt'}}>{this.props.frontTitle}</p>
   </Col>

   <Col md={6} sm={3} lg={6}>
     {this.props.priceChange!=undefined&&this.props.priceChange!=0? <Chip className='center-block'>{this.props.priceChange}</Chip> : ''}
   </Col>
  </Row>

  </CardTitle>

  <CardText style={{height: '210px'}}>
  <h1>{this.props.backGraph}</h1>
  </CardText>
  <CardActions>
  <Divider/>
  <Row>
   <Col md={6} xs={6}>
     <FlatButton label="BACK" onClick={this.props.OnFlipButtonClick} />
   </Col>


   <Col md={6} xs={6}>
     <FlatButton onClick={this.props.onDeleteCardClick} label="DELETE CARD" primary={true} labelStyle={{color: '#B71C1C'}} id={this.props.cardKey} />
   </Col>
  </Row>
  </CardActions>
  </Card>


   )
 }
}



const TableStyles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};



class TableExampleComplex extends Component {
  constructor(props){
    super(props);
  }
  state = {
    fixedHeader: true,
    fixedFooter: false,
    stripedRows: false,
    showRowHover: true,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: false,
    showCheckboxes: false,
    height: '150px',
  };



  render() {

    let data = ''
    if(this.props.tableData != undefined){
      data= this.props.tableData.map( (row, index) => (
        <TableRow key={index} className="cardRow">
          <TableRowColumn>{row.coin}</TableRowColumn>
          <TableRowColumn>{row.amount}</TableRowColumn>
          //animate value pulse on RENDER

              <TableRowColumn   id="price" className="pulse">{row.value} <a id='deleteCardRow' className="deleteCardRow" style={{ marginLeft: '60%'}}>delete</a></TableRowColumn>

          <TableRowColumn className="hiddenTable">{row.exchange}</TableRowColumn>

        </TableRow>

      ))
    }

    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn tooltip="Cryptocurrency">Coin</TableHeaderColumn>
              <TableHeaderColumn tooltip="Your amount">Amount</TableHeaderColumn>
              <TableHeaderColumn tooltip="Your current price">Current Value</TableHeaderColumn>
              <TableHeaderColumn className="hiddenTable"></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
              {data}
          </TableBody>

        </Table>
      </div>
    );
  }
}


 class Modal extends Component {

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Yes, Delete"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.handleDelete}
      />,
    ];

    return (
      <div>

        <Dialog
          title="Are you sure?"
          actions={actions}
          modal={false}
          open={this.props.openModal}
          onRequestClose={this.props.handleClose}
        >
          You will lose all data related to this card.
        </Dialog>
      </div>
    );
  }
}
