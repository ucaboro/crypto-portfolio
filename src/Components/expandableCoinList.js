import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Divider from 'material-ui/Divider';

export default class ExpandableCoinList extends Component {
  constructor(){
    super();
    this.state = {
      expanded: '0px',
      buttonLabel: 'List All Cryptocurrencies',
    }

    this.expandCoinList = this.expandCoinList.bind(this)
  }

  expandCoinList(){
    if(this.state.expanded==='0px'){
    this.setState({
      expanded: '1000px',
      buttonLabel: 'Collapse the list'
    })
  }else{
    this.setState({
      expanded: '0px',
      buttonLabel: 'List All Cryptocurrencies'

    })
  }

  }

  render(){
    return (
    <div>
      <FlatButton label={this.state.buttonLabel} primary={true} onClick={this.expandCoinList} style={{marginTop:'10px'}}/>
      <div className="center-block" id="expandableList" style={{maxHeight: this.state.expanded, maxWidth: this.state.expanded}}>
        <TableExampleSimple/>
      </div>
    </div>
    )
  }
}

function colorNum(num){
  if(num.charAt(0)==='-'){
    return '#B71C1C'
  } else{
    return '#388E3C'
  }
}


const TableExampleSimple = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Rank</TableHeaderColumn>
        <TableHeaderColumn>Coin</TableHeaderColumn>
        <TableHeaderColumn>MarketCap</TableHeaderColumn>
        <TableHeaderColumn>Price</TableHeaderColumn>
        <TableHeaderColumn>Change {'24hr'}</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{index+1}</TableRowColumn>
                <TableRowColumn>{row.coin}</TableRowColumn>
                <TableRowColumn>{row.marketCap}</TableRowColumn>
                <TableRowColumn>{row.price}</TableRowColumn>
                <TableRowColumn style={{color:colorNum(row.change)}}>{row.change}</TableRowColumn>
              </TableRow>
              ))}
    </TableBody>
  </Table>
);

function addEmoji(num){
  if(num>0){
  return '+'+num+'%'+'📈'
} else {
  return num+'%'+'📉'
}


}

const tableData = [

  {
    coin: 'BTC',
    price: '10,000$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-1.2),
  },
  {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+3.1),
  },
  {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2),
  },
];
