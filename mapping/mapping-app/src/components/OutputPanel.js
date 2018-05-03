import React, { Component } from 'react';
import { Button } from './Input';
import { ScatterChart } from './Scatter'
import { Map } from './Map'


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
      view: 'map'
    }
  }

  showMap = () => {
    this.setState({
      view: 'map'
    })
  }

  showChart = () => {
    this.setState({
      view: 'chart'
    })
  }
  render() {
    return(
      <div style={outputPanel}>
        <div style={header}>
          <button onClick={this.showMap}> Map </button> 
          <button onClick={this.showChart}> Chart </button> 
        </div>
        <hr />
        { this.state.view == 'map' ? <Map code={ this.props.depVar }/> : null}
        { this.state.view == 'chart' ? 
          <ScatterChart 
            depVar= { this.props.depVar } 
            indepVar={ this.props.indepVar }
          /> : null
        }
      </div>
    )
  }
}

