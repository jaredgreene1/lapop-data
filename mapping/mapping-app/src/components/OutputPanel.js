import React, { Component } from 'react';
import { Button } from './Input';
import { ScatterChart } from './Scatter'
import { Map } from './Map'
import { getData } from '../data/data';

const outputPanel = {
 backgroundColor: '#FFF',
 width: 'fit-content',
 margin: '0 auto',
 padding: '10px',
 color: '#313131',
 borderRadius: '3px',
 boxShadow: 'black 2px 2px 15px',
}

const header = {
  display: 'flex'
}


export class OutputPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: getData(this.props.unit, this.props.year)
    }
  }


  componentDidUpdate = (prevProps, prevState, snapshoot) => {
    console.log(prevProps.year + ', ' + this.props.year)
    console.log(prevProps.unit + ', ' + this.props.unit)
    if (prevProps.year != this.props.year || this.props.unit != prevProps.unit){
      console.log("updating data")
      this.setState({data: getData(this.props.unit, this.props.year)})
    }
  }
      
  
  render() {
    return(
      <div style={outputPanel}>
        { this.props.view == 'map' && 
          <Map 
            code={ this.props.depVar } 
            data={ this.state.data }
          />
        }

        { this.props.view == 'chart' && 
          <ScatterChart 
            depVar= { this.props.depVar } 
            indepVar={ this.props.indepVar }
            data={ this.state.data }
          /> 
        }
      </div>
    )
  }
}

