import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import {Row, Col} from 'react-bootstrap';
import request from 'superagent'
import CircularProgress from 'material-ui/CircularProgress';


class AddCoin extends Component {
  constructor(props){
    super(props)

    this.state = {
      isLoaded: false
    }

    this.getExchangeList()
    this.getAllCoins()
  }



  getExchangeList = () => {
    request
    .get('https://min-api.cryptocompare.com/data/all/exchanges')
    .end(function(err, res){
      if (err || !res.ok) {
           console.error('retrieval of exchanges failed: '+ res.body);
         } else {
            exchanges = Object.keys(res.body)
         }
  });
  }

  getAllCoins = () =>{
    let that = this
    request
    .get('https://min-api.cryptocompare.com/data/all/coinlist')
    .end(function(err,res){
      if(err || !res.ok){
        console.error('retrieval of coins failed: '+ res.body)
      }else{
        let resLen = Object.keys(res.body.Data).length
        console.log(Object.values(res.body.Data))
        for(let i = 0;i< resLen; i++){
          let key = Object.values(res.body.Data)[i].SortOrder
          let value = Object.values(res.body.Data)[i].FullName
          let img = Object.values(res.body.Data)[i].ImageUrl
          coins.push({ key,  value, img })
        }
         sortedCoins = coins.sort(function(obj1, obj2) {
          	// Ascending: first key less than the previous
          	return obj1.key - obj2.key;
          });

          for (let k=0; k<sortedCoins.length-2000; k++){
            coinsNames.push(sortedCoins[k].value)
          }


          if(sortedCoins.length!=0){
          that.setState({
            isLoaded: true
          })
        }
      }

    })


  }





  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Add to card"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.addCoinToCard}
      />,
    ];

    let coinPage = (
      <div>
      <AutoComplete
        onUpdateInput = {this.props.coin}
        floatingLabelText="COIN"
        hintText="Search a coin, e.g. type 'BTC'"
        filter={AutoComplete.fuzzyFilter}
        dataSource={coinsNames}
        maxSearchResults={5}
        fullWidth={true}
        underlineStyle={{borderColor:'white'}}
      />

      <TextField
        onChange = {this.props.amount}
        floatingLabelText="AMOUNT"
        hintText="Enter coin amount"
        fullWidth={true}
        underlineStyle={{borderColor:'white'}}
      />

      <AutoComplete
        onUpdateInput = {this.props.exchange}
        floatingLabelText="EXCHANGE"
        hintText="Search for exchange"
        filter={AutoComplete.fuzzyFilter}
        dataSource={exchanges}
        maxSearchResults={5}
        fullWidth={true}
        underlineStyle={{borderColor:'white'}}

      />

      <TextField
        onChange = {this.props.invested}
        floatingLabelText="INVESTED"
        hintText="Enter invested amount in USD"
        fullWidth={true}
        underlineStyle={{borderColor:'white'}}
      />
      </div>
    )

    console.log(coinsNames)

    return (
      <div>

        <Dialog
          title="Let's 📌 a coin to your card "
          actions={actions}
          modal={false}
          open={this.props.openAddCoin}
          onRequestClose={this.props.handleClose}
        >

        {this.state.isLoaded ? coinPage : <CircularProgress/>}

        </Dialog>
      </div>
    )
  }
}

let sortedCoins = []
let  coinsNames = []
let coins = []

let exchanges = []

export default AddCoin
