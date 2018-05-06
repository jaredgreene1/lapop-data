import React, { Component } from 'react';
import { Button } from './Input';
import { ScatterChart } from './Scatter'
import { Map } from './Map'
import { StatsOutput } from './StatsOutput'
import { getData } from '../data/data';
import { ols } from '../stats';
import muni_map from '../data/muni_map.json';
import dept_map from '../data/dept_map.json';


const outputPanel = {
 backgroundColor: '#FFF',
 width: '500px',
 minHeight: '400px',
 margin: '0 auto',
 padding: '10px',
 color: '#313131',
 borderRadius: '3px',
 boxShadow: 'black 2px 2px 15px',
}


const mapData = (unit, year, variable) => {
  return {
    geoData: geoData(unit),
    data: getData(unit, year),
    variable: variable,
    disabled: variable == undefined,
  }
}


const statsData = (unit, year, depVar, exogVars) => {
  if( depVar == undefined || exogVars.length < 2)
    return({disabled: true})

  let data = getData(unit, year)
  let indeps = Object.values(data[exogVars[0].code]).map((dt, idx) => 
    exogVars.map(exogVar => data[exogVar.code][idx]))
  
  console.log(indeps)

  const deps = Object.values(data[depVar.code])
  let output = ols(deps, indeps)
  return({
    output: output,
    data: data,
    exogVars: exogVars,
    endogVar: depVar
  })
}


const geoData = (unit) => {
  switch(unit){
    case 'departamento':
      return dept_map
      break;
    case 'municipio':
      return muni_map
      break;
    default:
      throw "Invalid geographic unit"
  }
}


const scatterData = (unit, year, indepVar, depVar) => {
  const data = getData(unit, year)
  let labels = []
  if (unit == 'departamento')
    labels = Object.values(data.prov)
  if (unit == 'municipio')
    labels = Object.values(data.municipio)

  return {
    data: data,
    indepVar: indepVar,
    depVar: depVar,
    labels: labels,
    disabled: (depVar == undefined || indepVar == undefined)
  }
}


export class OutputPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div style={outputPanel}>
        { this.props.view == 'map' && 
          <Map 
            {...mapData(this.props.unit, 
                  this.props.year, 
                  this.props.depVar)}
          />
        }

        { this.props.view == 'scatter' && 
          <ScatterChart 
            {...scatterData(this.props.unit, 
                  this.props.year,
                  this.props.depVar,
                  this.props.indepVar)}
          />
        }

        { this.props.view == 'stats' &&
          <StatsOutput 
            {...statsData(this.props.unit, 
                  this.props.year, 
                  this.props.depVar, 
                  this.props.exogVars)}
          />
        }

      </div>
    )
  }
}

