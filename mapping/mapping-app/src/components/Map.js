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

const zoomButtons = {
  display: 'flex',
  flexDirection: 'column',
  left: '93%',
  top: '81%',
  width: 'fit-content',
  position: 'relative',
  boxShadow: 'black 1px 1px 3px',
  borderRadius: '2px',
  padding: '3px',
  background: '#fbfafa',
}

const button = {
  background: 'none',
  border: 'none',
  padding: '2px',

}

export class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zoom: 1.5,
      dept: '',
      muni: '',
      data: null,
      forceUpdate: false,  
      width: 200,
      height: 200,
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
    this.resize()
    if(this.state.forceUpdate){
      this.setState({
        forceUpdate: false
      })
    }
  }

  componentDidMount = () => this.resize()

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

  resize = () => {
   let el = document.getElementById('chart-output')
    if(el && (Math.abs(el.offsetHeight-this.state.height) > 10 || el.offsetWidth !== this.state.width))
    {
      this.setState({
        height: el.offsetHeight,
        width: el.offsetWidth
      })
    }
  }

  render() {
    if(this.props.disabled)
      return(
        <div>
          <h1 style={{margin: '15%', textAlign: 'center'}}> 
            Please select a data variable to show the map
          </h1>
        </div>)
    else
      return(
        <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
          <h3 style={{margin:'0'}}> {this.props.variable.label} </h3>
          <hr />
          <div style={zoomButtons}> 
            <button 
              style={Object.assign({}, button, 
                        {
                          borderBottom: '1px solid #e6e6e6',
                          padding: '4px',
                        }
                        )
                    } 
              onClick={ this.handleZoomIn }> 
              { '+' } 
            </button> 

            <button style={ button } onClick={ this.handleZoomOut }> { '-' } </button> 
          </div>
            <div style={{display: 'flex', flexGrow: '2', height:'100%'}}>  
              {this.state.dept ? 
                <InfoBox 
                  data={ this.state.data }
                  department={ this.state.dept }
                  municipality={ this.state.muni}/> 
                : null
              }
              <div id='chart-output' style={{width: '100%', height: '100%'}}>
                <ComposableMap width={this.state.width} height={this.state.height} projectionConfig={{
                    scale: 6000,
                }}>
                  <ZoomableGroup zoom={ this.state.zoom } center={[-92, 17]}>
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
        </div>
      )
    }
  }

