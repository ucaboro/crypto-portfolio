import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import {Row, Col} from 'react-bootstrap';
import request from 'superagent'
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import {loadCoinNames} from '../firebase/db';
import {db} from '../firebase/firebase';

class AddCoin extends Component {
  constructor(props){
    super(props)
    console.time('timer')
    this.state = {
      isLoaded: false
    }

    this.getExchangeList()

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

  /*
  //the below was used to retrieve all the coins from the API, sort them and push to the Autosuggest.
  //since the API returned a lot more data - this turned to be inefficiently slow
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

          for (let k=0; k<sortedCoins.length; k++){
            coinsNames.push(sortedCoins[k].value)
          }
          //clear the coins in the db and use the below function to capture a snapshot of coin names to put in db (quicker retrieval)
          //loadDbWithCoinNames(coinsNames)
          if(sortedCoins.length!=0){
          that.setState({
            isLoaded: true
          })
        }
      }
    })
  }*/

  componentDidMount(){
    let coinsFromDb = db.ref().child('coins').child('-LBwn6Kt81C3g65yR7ns')
    coinsFromDb.on('value', snap => {
      coinsNames.push(snap.val())
      console.log(coinsNames)
      if(coinsNames.length!=0){
        this.setState({
          isLoaded: true
        })
      }
    })
    console.timeEnd('timer')
    }



  render() {
    console.log(coinsNames)
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

      </div>
    )


    return (
      <div>

        <Dialog
          title="Let's 📌 a coin to your card "
          actions={actions}
          modal={false}
          open={this.props.openAddCoin}
          onRequestClose={this.props.handleClose}
        >

        {this.state.isLoaded ?
        <AutoComplete
        onUpdateInput = {this.props.coin}
        floatingLabelText="COIN"
        hintText="Search a coin, e.g. type 'BTC'"
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={coinsNames[0]}
        maxSearchResults={5}
        fullWidth={true}
        underlineStyle={{borderColor:'white'}}/>
        : <CircularProgress mode="indeterminate"/> }

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
