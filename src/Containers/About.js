import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CryptoCard from '../Components/card';
import Dragula from 'react-dragula';

import posed from 'react-pose'
import styled from "styled-components";


const Square = posed.div({
  idle: { scale: 1 },
  hovered: { scale: 1.5 }
});

const StyledSquare = styled(Square)`
  width: 100px;
  height: 100px;
  background: red;
`;

export default class About extends Component{
  constructor(props){
    super(props)

  this.state = { hovering: false };
}



//create a dish
 prepare(dish){
 return dish
}

combine(dish1, dish2){
   //console.log('adding ' + dish1 + ' to ' + dish2)
   return 'finished mixing ' + dish1 + ' with ' + dish2
}

finalTouch(...element){
      //console.log('adding '+ element)
      return 'cheese added'
}


finishCooking(){
   console.log('finished cooking')
   return 'finished cooking'
}

waitTillFinish(element){
  return new Promise(function(resolve, reject) {
    setTimeout(function(){
        resolve(element +' ✅');
      }, 1250);
  })
}

async makeItAsync(){
console.log('start cooking')

  let dish = await this.waitTillFinish(this.prepare('pasta'))
   console.log(dish)
  let dish2 = await this.waitTillFinish(this.prepare('bacon'))
   console.log(dish2)
  let combine = await this.waitTillFinish(this.combine(dish, dish2))
   console.log(combine)
  let cheesy =  await this.waitTillFinish(this.finalTouch('cheese'))
  console.log(cheesy)
}



  render(){

    this.makeItAsync()

    /*this.prepare('pasta')
    this.prepare('bacon')
    this.combine('bacon', 'pasta')
    this.finalTouch('cheese')


    let promise = new Promise(function(resolve, reject) {
      setTimeout(function(){
          resolve('✅');
        }, 1250);
    })
    promise
    .then(result => this.prepare('pasta', result))
    .then(result => this.prepare('bacon', result))
    .then(result => this.combine('bacon', 'pasta'))
    .then(result => this.finalTouch('cheese'))



    /*this.prepare('pasta', this.finishCooking)
    this.prepare('bacon', this.finishCooking)
    this.combine('bacon', 'pasta')
    this.finalTouch('cheese')*/

    return(
      <div>

        <StyledSquare
          pose={this.state.hovering ? "hovered" : "idle"}
          onMouseEnter={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}
        />

      <p>ABOUT PAGE</p>
      <RaisedButton label="Primary" />
        <div className='' ref={this.dragulaDecorator}>


                <CryptoCard

                  priceChange="1,000$"
                  frontTitle="COINBASE"
                  backGraph="Graph on the back of the card 📈"/>

                <CryptoCard   priceChange="734$" frontTitle="binance"/>
                <CryptoCard   priceChange="213$" frontTitle="tracking"/>
        </div>;
      </div>
    )
  }

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance], options);
    }
  };
}
