import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import {Row, Col} from 'react-bootstrap';


class AddCoin extends Component {

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
        onClick={this.props.handleClose}
      />,
    ];

    return (
      <div>

        <Dialog
          title="Let's 📌 a coin to your card "
          actions={actions}
          modal={false}
          open={this.props.openAddCoin}
          onRequestClose={this.props.handleClose}
        >

                  <AutoComplete
                    floatingLabelText="COIN"
                    hintText="Search a coin, e.g. type 'BTC'"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={coins}
                    maxSearchResults={5}
                    fullWidth={true}
                    underlineStyle={{borderColor:'white'}}
                  /><br/>

                  <TextField
                    floatingLabelText="AMOUNT"
                    hintText="Enter coin amount"
                    fullWidth={true}
                    underlineStyle={{borderColor:'white'}}
                  /><br/>

                  <AutoComplete
                    floatingLabelText="EXCHANGE"
                    hintText="Search for exchange"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={exchanges}
                    maxSearchResults={5}
                    fullWidth={true}
                    underlineStyle={{borderColor:'white'}}

                  /><br/>

                  <TextField
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

const coins = [
  'BTC', 'ETH', 'ADA', 'EOS', 'XRP', 'LTC'
]

const exchanges = [
  'Binance', 'Birfinex', 'Huobi', 'Hitbtc', 'GDAX', 'Coinbase'
]

export default AddCoin
