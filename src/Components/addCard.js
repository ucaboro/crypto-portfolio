import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';
import {Card, CardHeader, CardMedia, CardTitle, CardText, CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import BackgroundIcon from 'material-ui/svg-icons/editor/monetization-on';
import FlatButton from 'material-ui/FlatButton';
import {db, auth} from '../firebase/firebase';
import {addCard} from '../firebase/db';

  const ChipStyles = {
    chip: {
      margin: '15px 0 0 0',
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };

  const iconStyles = {
    height: '100px',
    width: '100px',
    color: '#F5F5F5',
    marginTop: '10px'
  };
export default class AddCryptoCard extends Component{
  constructor(props){
    super(props);

    this.state = {
      cardName :'',
    }

  }







  render(){
    return(

<Col md={4} >
  <section className="FlipContainer" style={{zIndex: '999', borderRadius: '50px'}}>
    <div id="card">


        <Card className='CryptoCardUI'>

             <CardTitle
               style={{borderRadius: '6px 6px 0 0', color: 'white', height: '70px'}}
               className='CardHeader'>
               <Row>

                    <TextField
                      onChange = {this.props.changeCardName}
                      hintText="Name this card"
                      fullWidth={true}
                      underlineShow={false}
                      hintStyle={{color: '#E1F5FE',  fontSize: '30px'}}
                      inputStyle={{color: 'white', fontSize:'30px', textTransform: 'uppercase'}}
                      onKeyPress={this.props.onKeyPress}
                    />

               </Row>

              </CardTitle>

             <CardText style={{padding: '0px'}}>


        <Table>
          <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}>
             <TableRow>
               <TableHeaderColumn>Coin</TableHeaderColumn>
               <TableHeaderColumn>Amount</TableHeaderColumn>
               <TableHeaderColumn>Current Value</TableHeaderColumn>
             </TableRow>
          </TableHeader>
        </Table>

        <p style={{opacity: '0.3', marginTop: '15px'}}>
        Name your card at the top, <br/> you will be able to add coins afterwards
        </p>
               <BackgroundIcon style={iconStyles}/>

             </CardText>

          <FlatButton onClick={this.props.onCreateClick} label="CREATE" style={{color: '#7db9e8'}}/>

           </Card>
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

<Card className='CryptoCardUI'>

     <CardTitle
       style={{borderRadius: '6px 6px 0 0', color: 'white', height: '70px'}}
       className='CardHeader'>
       <Row>

            <TextField
              hintText="Name this card"
              fullWidth={true}
              underlineShow={false}
              hintStyle={{color: '#E1F5FE',  fontSize: '30px'}}
              inputStyle={{color: 'white', fontSize:'30px', textTransform: 'uppercase'}}
            />

       </Row>

      </CardTitle>

     <CardText style={{padding: '0px'}}>


<Table>
  <TableHeader
  displaySelectAll={false}
  adjustForCheckbox={false}
  enableSelectAll={false}>
     <TableRow>
       <TableHeaderColumn>Coin</TableHeaderColumn>
       <TableHeaderColumn>Amount</TableHeaderColumn>
       <TableHeaderColumn>Current Value</TableHeaderColumn>
     </TableRow>
  </TableHeader>
</Table>

<p style={{opacity: '0.3', marginTop: '15px'}}>
Name your card at the top, <br/> you will be able to add coins afterwards
</p>
       <BackgroundIcon style={iconStyles}/>

     </CardText>

  <FlatButton onClick={this.props.onCreateClick} label="CREATE" style={{color: '#7db9e8'}}/>

   </Card>


    )
  }
}
