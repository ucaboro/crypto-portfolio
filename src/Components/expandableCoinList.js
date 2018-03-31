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

import {List, ListItem} from 'material-ui/List';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="Add to card"
    tooltipPosition="bottom-left"
  >
    <IconAddButton color={grey400} />
  </IconButton>
);


class CryptoIcon extends Component{
  constructor(props){
    super(props);
  }


  render(){
    var lowCase = this.props.string.toLowerCase();
    var firstLetterCap = "Icon."+lowCase.charAt(0).toUpperCase() + lowCase.slice(1);

    return(
    `<Icon.Btc/>`
    )
  }
}



export default class ExpandableCoinList extends Component {
  constructor() {
    super();
    this.state = {
      expanded: '0px',
      buttonLabel: 'List All Cryptocurrencies',
      elements: this.buildElements(0, 15),
      isInfiniteLoading: false
    }
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
    this.expandCoinList = this.expandCoinList.bind(this)
  }
   IconCapitalizeFirstLetter(string) {
     var lowCase = string.toLowerCase();
     var firstLetterCap = lowCase.charAt(0).toUpperCase() + lowCase.slice(1);
    return firstLetterCap
}

    stringToIcon(string){

        switch(string) {
          case ('BTC'):
          return <Icon.Btc/>;

          case ('ETH'):
          return <Icon.Eth/>;

            case ('LTC'):
            return <Icon.Ltc/>;

              case ('EOS'):
              return <Icon.Eos/>;

                case ('ADA'):
                return <Icon.Ada/>;
        }

      }



  expandCoinList() {
    if (this.state.expanded === '0px') {
      this.setState({expanded: '1000px', buttonLabel: 'Collapse the list'})
    } else {
      this.setState({expanded: '0px', buttonLabel: 'List All Cryptocurrencies'})
    }

  }

  buildElements(start, end) {
    var elements = [];
    console.log(this.IconCapitalizeFirstLetter("BTC"))
    if (end < tableData.length) {
      for (var i = start; i < end; i++) {
        elements.push(


          <ListItem
            leftAvatar={<p style={{verticalAllign: 'middle'}}>{i+1} &nbsp; {this.stringToIcon(tableData[i].coin)}   </p>}
            rightIconButton={iconButtonElement}
            primaryText={tableData[i].coin}
            secondaryText={tableData[i].price}
            className="center-block"
            style={{display:"table-row"}}
            key={i}>

          </ListItem>

        )
      }
    }
    return elements;

  }

  handleInfiniteLoad() {
    if (this.state.elements.length < tableData.length - 15) {

      this.setState({isInfiniteLoading: true});
      var that = this;
      setTimeout(function() {
        var elemLength = that.state.elements.length,
          newElements = that.buildElements(elemLength, elemLength + 10);
        that.setState({isInfiniteLoading: false, elements: that.state.elements.concat(newElements)});

      }, 1500);

    }

    console.log(this.state.elements.length + " " + tableData.length)

  }

  elementInfiniteLoad() {
    return <div className="infinite-list-item" style={{marginLeft: '15px'}}>
      <CircularProgress color={grey400}  size={30}/>
    </div>;
  }

  render() {

    return (
                  <div>
      <FlatButton label={this.state.buttonLabel} primary={true} onClick={this.expandCoinList} style={{
          marginTop: '10px'
        }}/>


      <div className="center-block" id="expandableList" style={{
          maxHeight: this.state.expanded,
          maxWidth: this.state.expanded
        }}>

        <Infinite
                      elementHeight={50}
                      containerHeight={400}
                      infiniteLoadBeginEdgeOffset={100}
                      onInfiniteLoad={this.handleInfiniteLoad}
                      loadingSpinnerDelegate={this.elementInfiniteLoad()}
                      isInfiniteLoading={this.state.isInfiniteLoading}>

          {this.state.elements}

      </Infinite>

      </div>

    </div>
  )
  }
}

function colorNum(num) {
  if (num.charAt(0) === '-') {
    return '#B71C1C'
  } else {
    return '#388E3C'
  }
}










class ListExampleSimple extends Component {
  constructor() {
    super();
    this.state = {
      elements: this.buildElements(0, 15),
      isInfiniteLoading: false
    }
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
  }

  buildElements(start, end) {
    var elements = [];
    if (end < tableData.length) {
      for (var i = start; i < end; i++) {
        elements.push(
          <List key={i}>{i} {tableData[i].coin} {tableData[i].price} {tableData[i].marketCap} {tableData[i].change}</List>

)
      }
    }
    return elements;

  }

  handleInfiniteLoad() {
    if (this.state.elements.length < tableData.length - 15) {

      this.setState({isInfiniteLoading: true});
      var that = this;
      setTimeout(function() {
        var elemLength = that.state.elements.length,
          newElements = that.buildElements(elemLength, elemLength + 10);
        that.setState({isInfiniteLoading: false, elements: that.state.elements.concat(newElements)});

      }, 2500);

    }

    console.log(this.state.elements.length + " " + tableData.length)

  }

  elementInfiniteLoad() {
    return <div className="infinite-list-item">
      Loading...
    </div>;
  }
  render() {
    return (<div>
      {this.state.elements}
    </div>)
  }
}

function addEmoji(num) {
  if (num > 0) {
    return '+' + num + '%' + '📈'
  } else {
    return num + '%' + '📉'
  }

}

const tableData = [

  {
    coin: 'BTC',
    price: '10,000$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-1.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ADA',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'LTC',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: '16!EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }, {
    coin: 'ETH',
    price: '800$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(+ 3.1)
  }, {
    coin: 'EOS',
    price: '100$',
    marketCap: '125,862,406,273.35',
    change: addEmoji(-4.2)
  }
];
