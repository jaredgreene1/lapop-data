import React, { Component } from 'react';

import { scaleLinear } from "d3-scale";

import InfoBox from './InfoBox';
import ScaleBar from './ScaleBar';


import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps'

import getData from '../data.js';

const HIGHCOLOR = '#F3F9FE'
const MIDCOLOR = '#2769d4'
const LOWCOLOR = '#005eb1'

const colorScale = scaleLinear()
  .domain([0, .5, 1])
  .range([HIGHCOLOR, MIDCOLOR, LOWCOLOR])


const mapBox = {
 backgroundColor: '#cecece',
 width: 'fit-content',
 margin: '0 auto',
 color: '#313131',
}


export class MapControls extends Component {
  constructor() {
    super()
  } 


  render() {
    return(
      <select onChange={this.props.changeMapData}>
        <option value={"www1"}> Internet usage </option>
        <option value={"pol1"}> Interest in politics</option>
        <option value={"indig"}> Indigineous population </option>
      </select>)
  }
}

export class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zoom: 1.2,
      view: 1, // 0 for department view and 1 for municipality view 
      dept: '',
      muni: '',
      data: null,
      mapDataCategory: 'indig', 
    }
  }

  toggleView = () => {
    this.setState( (prevState, props) => {
      const newView = prevState.view ^= 1 //toggles between 1 and 0 w/ an XOR
      return {view: newView} 
    })
  }

  changeMapData = (e) => this.setState({ mapDataCategory: e.target.value })

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
        <div style={{padding: '10px'}}> 
          <button style={{marginRight: '5px'}} onClick={ this.toggleView}> 
            {this.state.view ? 'Department view': 'Municipality view'} 
          </button>
          <button onClick= { this.handleZoomIn }> + </ button>
          <button onClick= { this.handleZoomOut }> - </ button>
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
          <ScaleBar highColor={HIGHCOLOR} lowColor={LOWCOLOR}/>
          <ComposableMap width={500} height={500} projectionConfig={{
              scale: 6000,
              xOffset: 3506,
              yOffset: 710,
              width: 20,
          }}>
            <ZoomableGroup zoom={ this.state.zoom }>
            <Geographies geography={this.geoFile()} > 
              {(geographies, projection) => geographies.map((geography, i) => {
                geography.properties['data'] = getData(geography.properties) 
                return(
                  <Geography
                    key={ geography.id }
                    cacheId={ geography.id }
                    geography={ geography }
                    projection={ projection }
                    onClick={ this.handleClick }
                    onMouseOver={ (e) => this.handleMouseOver(e, geography.properties)}
                    onWheel={ this.handleWheel }
                    style = {{
                      default: { 
                        fill: colorScale(geography.properties.data[this.state.mapDataCategory]),
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

