import React, { Component } from 'react';

import { scaleLinear } from "d3-scale";
import { Button } from 'react-bootstrap';
import InfoBox from './InfoBox';
import { getDataByLocation } from '../data/data.js';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps'

const LOWCOLOR  = '#005eb1'
const MIDCOLOR  = '#2769d4'
const HIGHCOLOR = '#F3F9FE'


export class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zoom: 1.5,
      dept: '',
      muni: '',
      data: null,
      forceUpdate: false,  
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.variable != this.props.variable || nextProps.data != this.props.data){
      this.setState({
        forceUpdate: true,
      })
    }
  }

  colorScale = () => scaleLinear()
    .domain([
      this.props.variable.low, 
      (this.props.variable.high - this.props.variable.low)/(2.0), 
      this.props.variable.high, 
    ]).range([HIGHCOLOR, MIDCOLOR, LOWCOLOR])

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if(this.state.forceUpdate){
      this.setState({
        forceUpdate: false
      })
    }
  }

  handleZoomIn = () => {
    this.setState({ zoom: this.state.zoom * 1.15, })
  }

  handleZoomOut = () => {
    this.setState({ zoom: this.state.zoom / 1.15, })
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
        <h3> {this.props.variable.label} </h3>
        <hr />
        <div style={{padding: '10px', display: 'flex'}}> 
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
                geography={ this.props.geoData } 
                disableOptimization={ this.state.forceUpdate }
              > 
                {(geographies, projection) => geographies.map((geography, i) => {
                geography.properties['data'] = getDataByLocation(geography.properties, this.props.data) 
                return(
                  <Geography
                    key={ geography.id }
                    geography={ geography }
                    cacheId={ 'geography-' +  geography.properties.ID_2 + geography.properties.ID_1 + this.props.geoData[0]}
                    projection={ projection }
                    onClick={ this.handleClick }
                    onMouseOver={ (e) => this.handleMouseOver(e, geography.properties)}
                    onWheel={ this.handleWheel }
                    style = {{
                      default: { 
                        fill: this.colorScale()(geography.properties.data[this.props.variable.code]),
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

