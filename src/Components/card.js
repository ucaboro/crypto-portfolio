import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
//import { FlipCard } from 'react-flop-card';


import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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
  constructor(){
    super();
    this.state ={
      flipped: ''
    }
    this.flipCardOnClick = this.flipCardOnClick.bind(this)
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

  render(){
    return(

<Col md={4}>
  <section className="FlipContainer">
    <div id="card" className={this.state.flipped}>
      <CryptoCardFront OnFlipButtonClick={this.flipCardOnClick}/>
      <CryptoCardBack OnFlipButtonClick={this.flipCardOnClick}/>
    </div>
  </section>
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
       style={{borderRadius: '6px 6px 0 0'}}
       className='CardHeader'>
       <Row>
         <Col md={6} sm={9} lg={6}>
           <p style={{fontSize: '20pt'}}>Title</p>
         </Col>

         <Col md={6} sm={3} lg={6}>
           <Chip className='center-block'>1000</Chip>
         </Col>
       </Row>

      </CardTitle>

     <CardText style={{padding: '0px'}}>
       <TableExampleComplex/>
     </CardText>
     <CardActions>
       <Divider/>
       <Row>
         <Col md={6} xs={6}>
           <FlatButton label="MORE INFO" onClick={this.props.OnFlipButtonClick} />
         </Col>

         <Col md={3} xs={3}>
           <FlatButton label="SELL" />
         </Col>

         <Col md={3} xs={3}>
           <FlatButton label="ADD NEW" primary={true} />
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
  style={{borderRadius: '6px 6px 0 0'}}
  className='CardHeaderBack'>
  <Row>
   <Col md={6} sm={9} lg={6}>
     <p style={{fontSize: '20pt'}}>Title</p>
   </Col>

   <Col md={6} sm={3} lg={6}>
     <Chip className='center-block'>1000</Chip>
   </Col>
  </Row>

  </CardTitle>

  <CardText style={{height: '210px'}}>
  <h1>Back side graph here</h1>
  </CardText>
  <CardActions>
  <Divider/>
  <Row>
   <Col md={6} xs={6}>
     <FlatButton label="MORE INFO" onClick={this.props.OnFlipButtonClick} />
   </Col>

   <Col md={3} xs={3}>
     <FlatButton label="SELL" />
   </Col>

   <Col md={3} xs={3}>
     <FlatButton label="ADD NEW" primary={true} />
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

const tableData = [
  {
    coin: 'BTC',
    amount: '0.45',
    value: '10000$'
  },
  {
    coin: 'ETH',
    amount: '12.45',
    value: '8000$'
  },
  {
    coin: 'EOS',
    amount: '115',
    value: '1150$'
  },
  {
    coin: 'LTC',
    amount: '3.12',
    value: '900$'
  },
  {
    coin: 'ADA',
    amount: '98',
    value: '867$'
  },
];

class TableExampleComplex extends Component {
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
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.coin}</TableRowColumn>
                <TableRowColumn>{row.amount}</TableRowColumn>
                <TableRowColumn>{row.value}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>

        </Table>
      </div>
    );
  }
}
