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
      <TableExampleComplex
      column1={this.props.column1}
      column2={this.props.column2}
      column3={this.props.column3}
      tooltip1={this.props.tooltip1}
      tooltip2={this.props.tooltip2}
      tooltip3={this.props.tooltip3}
      mappedRows={this.props.mappedRows}
      tableData={this.props.tableData}/>
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
      if(this.props.mappedRows==='investment'){
      data= this.props.tableData.map( (row, index) => (
        <TableRow key={index}>
          <TableRowColumn>{row.investment}</TableRowColumn>
          <TableRowColumn>{row.coin}</TableRowColumn>
          <TableRowColumn>{row.amount}</TableRowColumn>
        </TableRow>
      ))
    }else if(this.props.mappedRows==='profit'){
      data= this.props.tableData.map( (row, index) => (
        <TableRow key={index}>
          <TableRowColumn>{row.coin}</TableRowColumn>
          <TableRowColumn>{row.amount}</TableRowColumn>
          <TableRowColumn>{row.currentValue}</TableRowColumn>
        </TableRow>
      ))
    }
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
              <TableHeaderColumn tooltip={this.props.tooltip1}>{this.props.column1}</TableHeaderColumn>
              <TableHeaderColumn tooltip={this.props.tooltip2}>{this.props.column2}</TableHeaderColumn>
              <TableHeaderColumn tooltip={this.props.tooltip3}>{this.props.column3}</TableHeaderColumn>
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
