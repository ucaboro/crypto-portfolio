import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Divider from 'material-ui/Divider';
import Infinite from 'react-infinite'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {grey400} from 'material-ui/styles/colors';
import IconAddButton from 'material-ui/svg-icons/content/add-circle';
import * as Icon from 'react-cryptocoins';
import CircularProgress from 'material-ui/CircularProgress';
import request from 'superagent';

import InfiniteScroll from 'react-simple-infinite-scroll'

import {List, ListItem} from 'material-ui/List';


const tableData = [

];

export default class ExpandableCoinList extends Component {
  constructor(props) {
   super(props);



   this.state = {
     expanded: '0px',
     buttonLabel: 'List All Cryptocurrencies',
      items: 10,
      loadedItems: 10,
      loadingState: false,
      table: tableData
    };

    //binding
    this.expandCoinList = this.expandCoinList.bind(this)


  }



  componentDidMount() {
    console.log("On Mount length: "+this.state.table.length)


    this.refs.iScroll.addEventListener("scroll", () => {
      if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=this.refs.iScroll.scrollHeight){
        //condition to ensure the data was loaded and has more rows to show
        if(this.state.table.length==tableData.length){
          this.loadMoreItems()
        }
      }
    });

  }



  displayItems() {

    var items = [];
    for (var i = 0; i < this.state.items; i++) {
      items.push(

        <ListItem
                  leftAvatar={<p style={{verticalAllign: 'middle'}}>{i+1} &nbsp; {this.stringToIcon(this.state.table[i].coin)}   </p>}
                  rightIconButton={iconButtonElement}
                  primaryText={this.state.table[i].coin}
                  secondaryText={this.state.table[i].price}
                  className="center-block"
                  style={{display:"table-row"}}
                  key={i}>

        </ListItem>

      );
    }

    return items;
  }

  loadMoreItems() {

    this.setState({ loadingState: true});
    console.log("loadMoreItems" + " loadedItems: "+this.state.loadedItems +"items: "  + this.state.items)

    //condition to prevent error at the last items
      if(this.state.loadedItems<this.state.table.length){
        //this.setState({loadedItems: this.state.loadedItems+5})
      console.log("condition for loadMore passed")
    setTimeout(() => {
      this.setState({items: this.state.items+10, loadedItems: this.state.loadedItems+10, loadingState: false });
    }, 1500);
  } else {
    console.log('ladoing more from the API')
    this.getCoins(this.state.loadedItems, 20)
    this.setState({loadingState: false})
  }
  }

  render() {
    return (
      <div>


      <FlatButton label={this.state.buttonLabel} primary={true} onClick={this.expandCoinList} style={{
          marginTop: '10px'
        }}/>

      <div ref="iScroll" className="center-block" id="expandableList" style={{ maxHeight: this.state.expanded, maxWidth: this.state.expanded, overflow: "auto" }}>
        <div style={{height:"400px"}}>
        <List>
          {this.state.table.length>0 ? this.displayItems() : <CircularProgress/>}
        </List>

        {this.state.loadingState ? <CircularProgress/>: ""}
      </div>
      </div>
            </div>

    );
  }


     getCoins(start, limit){

       var that=this;
         request
            .get('https://api.coinmarketcap.com/v1/ticker/')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .query({ start: start, limit: limit})

            .end(function(err, res){
              if (err || !res.ok) {
              alert(err)

            } else {
              console.log(' LOADED '+limit+' MORE')
              console.log(res.body)

              for (let i = 0; i < res.body.length; i++) {
                tableData.push({coin: res.body[i].symbol, price: res.body[i].price_usd, change: res.body[i].percent_change_24h});
              }
              that.setState({table: tableData})
              console.log("request length: " + res.body.length +"   state.table.length:" + that.state.table.length)
            }
            })

            }


              expandCoinList() {

                if (this.state.expanded === '0px') {
                  if(this.state.table.length==0){
                  //initial table load
                  this.getCoins(0, 50)
                }
                  this.setState({expanded: '1000px', buttonLabel: 'Collapse the list'})
                } else {
                  this.setState({expanded: '0px', buttonLabel: 'List All Cryptocurrencies'})
                }

              }

  stringToIcon(string) {
switch (string) {
  case('BTC'):
    return <Icon.Btc/>;

  case('ETH'):
    return <Icon.Eth/>;

  case('LTC'):
    return <Icon.Ltc/>;

  case('EOS'):
    return <Icon.Eos/>;

  case('ADA'):
    return <Icon.Ada/>;
}
}

addEmoji(num) {
  if (num > 0) {
    return '+' + num + '%' + '📈'
  } else {
    return num + '%' + '📉'
  }

}

}


function colorNum(num) {
  if (num.charAt(0) === '-') {
    return '#B71C1C'
  } else {
    return '#388E3C'
  }
}


function addEmoji(num) {
  if (num > 0) {
    return '+' + num + '%' + '📈'
  } else {
    return num + '%' + '📉'
  }

}



const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="Add to card"
    tooltipPosition="bottom-left"
  >
    <IconAddButton color={grey400} />
  </IconButton>
);
