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


    //this.state.expanded ? ExpandableCoinListStyles.height='100%' : ''
  }

  render(){
    return (
    <div>
      <FlatButton label={this.state.buttonLabel} primary={true} onClick={this.expandCoinList}/>
      <div className="center-block" id="expandableList" style={{maxHeight: this.state.expanded, maxWidth: this.state.expanded}}>
        <TableExampleSimple/>
      </div>
    </div>
    )
  }
}



const TableExampleSimple = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableRowColumn>1</TableRowColumn>
        <TableRowColumn>John Smith</TableRowColumn>
        <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>2</TableRowColumn>
        <TableRowColumn>Randal White</TableRowColumn>
        <TableRowColumn>Unemployed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>3</TableRowColumn>
        <TableRowColumn>Stephanie Sanders</TableRowColumn>
        <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>4</TableRowColumn>
        <TableRowColumn>Steve Brown</TableRowColumn>
        <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>5</TableRowColumn>
        <TableRowColumn>Christopher Nolan</TableRowColumn>
        <TableRowColumn>Unemployed</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);
