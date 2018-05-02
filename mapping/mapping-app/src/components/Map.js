import React, { Component } from 'react';

import { scaleLinear } from "d3-scale";

import InfoBox from './InfoBox';
import ScaleBar from './ScaleBar';
import { Button } from './Input';
import getData from '../data.js';


import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps'

const HIGHCOLOR = '#F3F9FE'
const MIDCOLOR = '#2769d4'
const LOWCOLOR = '#005eb1'

const colorScale = scaleLinear()
  .domain([0, .5, 1])
  .range([HIGHCOLOR, MIDCOLOR, LOWCOLOR])


const mapBox = {
 backgroundColor: '#FFF',
 width: 'fit-content',
 margin: '0 auto',
 color: '#313131',
 borderRadius: '7px',
 boxShadow: 'black 2px 2px 15px'
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
  

  componentWillReceiveProps = (props) => {
    if (props.code != this.props.dataCode){
      this.setState({
        dataCode: this.props.code,
        forceUpdate: true,
      })
    }
  }


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
      <div style={mapBox}>
        <div style={{padding: '10px', display: 'flex'}}> 
          <Button 
            callback={ this.toggleView } 
            text= {this.state.view ? 'Department view': 'Municipality view'} 
            /> 
          <Button callback={ this.handleZoomIn } text={ '+' } /> 
          <Button callback={ this.handleZoomOut } text={ '-' } /> 
        </div>
        <hr style={{margin: '0'}}/>
        <div>  
          {this.state.dept ? 
            <InfoBox 
              data={ this.state.data }
              department={ this.state.dept }
              municipality={ this.state.muni}/> 
            : null
          }
          <ComposableMap width={600} height={600} projectionConfig={{
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
                geography.properties['data'] = getData(geography.properties) 
                return(
                  <Geography
                    key={ geography.id }
                    geography={ geography }
                    cacheId={ 'geography-' + i + this.state.view + this.props.code}
                    projection={ projection }
                    onClick={ this.handleClick }
                    onMouseOver={ (e) => this.handleMouseOver(e, geography.properties)}
                    onWheel={ this.handleWheel }
                    style = {{
                      default: { 
                        fill: colorScale(geography.properties.data[this.props.code]),
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

