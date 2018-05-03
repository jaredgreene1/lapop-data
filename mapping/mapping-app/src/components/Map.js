import React, { Component } from 'react';

import { scaleLinear } from "d3-scale";
import { Button } from 'react-bootstrap';
import InfoBox from './InfoBox';
import { getDataByLocation } from '../data/data.js';
import { codes17 } from '../data/varcoding';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps'

const LOWCOLOR  = '#005eb1'
const MIDCOLOR  = '#2769d4'
const HIGHCOLOR = '#F3F9FE'

const mapBox = {
 backgroundColor: '#FFF',
 width: 'fit-content',
 margin: '0 auto',
 color: '#313131',
 borderRadius: '7px',
}


export class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zoom: 1.5,
      view: 1, // 0 for department view and 1 for municipality view 
      dept: '',
      muni: '',
      data: null,
      dataCode: this.props.code, 
      forceUpdate: false,  
    }
  }

  toggleView = () => {
    this.setState( (prevState, props) => {
      const newView = prevState.view ^= 1 //toggles between 1 and 0 w/ an XOR
      return {view: newView,}
    })
  }
  

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.code != this.state.dataCode){
      this.setState({
        dataCode: nextProps.code,
        forceUpdate: true,
      })
    }
  }

  colorScale = () => scaleLinear()
    .domain([
      codes17[this.state.dataCode].low, 
      (codes17[this.state.dataCode].high - codes17[this.state.dataCode].low)/(2.0), 
      codes17[this.state.dataCode].high, 
    ]).range([HIGHCOLOR, MIDCOLOR, LOWCOLOR])

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if(this.state.forceUpdate){
      this.setState({
        forceUpdate: false
      })
    }
  }

  geoFile = () => 'GT_' + this.state.view + '.json'

  handleZoomIn = () => {
    this.setState({ zoom: this.state.zoom * 1.15, })
  }

  handleZoomOut = () => {
    this.setState({ zoom: this.state.zoom / 1.15, })
  }

  handleClick = (geography, evt) => {
  }

  handleMouseOver = (e, geography) => {
    this.setState({
      dept: geography.NAME_1,
      muni: geography.NAME_2,
      data: geography.data
    })
  }
      
  handleWheel = (wheel, info) => {
   if( wheel.deltaY > 0) {
     this.handleZoomOut()
   } else if (wheel.deltaY < 0) {
     this.handleZoomIn()
   }
   wheel.preventDefault()
  }


  render() {
    return(
      <div>
        <h1> {codes17[this.state.dataCode].label} </h1>
        <div style={{padding: '10px', display: 'flex'}}> 
          <Button onClick={ this.toggleView } > 
            {this.state.view ? 'Department view': 'Municipality view'} 
          </Button>
          <Button active={true} bsSize={'small'} onClick={ this.handleZoomIn }> { '+' } </Button> 
            <Button bsSize={'lg'} onClick={ this.handleZoomOut }> { '-' } </Button> 
          </div>
          <div>  
            {this.state.dept ? 
              <InfoBox 
                data={ this.state.data }
                department={ this.state.dept }
                municipality={ this.state.muni}/> 
              : null
            }
            <ComposableMap width={500} height={500} projectionConfig={{
                scale: 6000,
                xOffset: 3506,
                yOffset: 710,
            }}>
              <ZoomableGroup zoom={ this.state.zoom }>
              <Geographies 
                geography={ this.geoFile() } 
                disableOptimization={ this.state.forceUpdate }
              > 
                {(geographies, projection) => geographies.map((geography, i) => {
                geography.properties['data'] = getDataByLocation(geography.properties) 
                return(
                  <Geography
                    key={ geography.id }
                    geography={ geography }
                    cacheId={ 'geography-' + i + this.state.view + this.state.dataCode}
                    projection={ projection }
                    onClick={ this.handleClick }
                    onMouseOver={ (e) => this.handleMouseOver(e, geography.properties)}
                    onWheel={ this.handleWheel }
                    style = {{
                      default: { 
                        fill: this.colorScale()(geography.properties.data[this.state.dataCode]),
                        stroke: "#000",
                        strokeWidth: "0.2",
                        outline: "none",
                      },
                      hover:   { 
                        fill: "#999",
                        boxShadow: '10px 3px red',
                      },
                    }}
                  />
                )}
              )}
            </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    )
  }
}

