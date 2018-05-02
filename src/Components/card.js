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
import {deleteOneCard} from '../firebase/db';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import AddCoin from '../Components/addCoin'


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
      openAddCoin: false
    }
    this.flipCardOnClick = this.flipCardOnClick.bind(this)
  }

  onAddCoinClick = () =>{
    this.setState({openAddCoin: true})
    console.log(this.state.openAddCoin)
  }

  closeAddCoin = () =>{
    this.setState({openAddCoin: false})
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
    const cardId = buttonContainer.id
    this.setState({toggledCardId: cardId})
    this.openModal()
  }

  deleteCardFromDb = () =>{
    if(this.state.toggledCardId.length!=0){
    deleteOneCard(this.state.toggledCardId)
   }
  }

  render(){


    return(

        <Col md={4}>
          <section className="FlipContainer">
            <div id="card" key={this.props.cardKey} className={this.state.flipped}>
              <CryptoCardFront tableData={this.props.tableData} priceChange={this.props.priceChange} frontTitle={this.props.frontTitle.toUpperCase()} OnFlipButtonClick={this.flipCardOnClick} onAddCoinClick={this.onAddCoinClick}/>
              <CryptoCardBack cardKey={this.props.cardKey} priceChange={this.props.priceChange} backGraph={this.props.backGraph} frontTitle={this.props.frontTitle.toUpperCase()} OnFlipButtonClick={this.flipCardOnClick}  onDeleteCardClick={this.onDeleteCardClick}/>
            </div>
          </section>
          <AddCoin openAddCoin={this.state.openAddCoin} handleClose={this.closeAddCoin}/>
          <Modal openModal={this.state.openModal} handleClose={this.closeModal} handleDelete={this.deleteCardFromDb}/>
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
           {this.props.priceChange!=undefined? <Chip className='center-block'>{this.props.priceChange}</Chip> : ''}
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
           <FlatButton onClick={this.props.onAddCoinClick} label="ADD NEW" primary={true} />
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
     {this.props.priceChange!=undefined? <Chip className='center-block'>{this.props.priceChange}</Chip> : ''}
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
        <TableRow key={index}>
          <TableRowColumn>{row.coin}</TableRowColumn>
          <TableRowColumn>{row.amount}</TableRowColumn>
          <TableRowColumn>{row.value}</TableRowColumn>
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
