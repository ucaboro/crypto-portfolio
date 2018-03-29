import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class AccountTable extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <TableExampleComplex tableData={this.props.tableData}/>
    )
  }
}


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
        <TableRow key={index}>
          <TableRowColumn>{row.investment+' $'}</TableRowColumn>
          <TableRowColumn>{row.coin}</TableRowColumn>
          <TableRowColumn>{row.amount}</TableRowColumn>
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
              <TableHeaderColumn tooltip="Invested amount">Investment</TableHeaderColumn>
              <TableHeaderColumn tooltip="Cryptocurrency">Coin</TableHeaderColumn>
              <TableHeaderColumn tooltip="Coin amount">Amount</TableHeaderColumn>
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
