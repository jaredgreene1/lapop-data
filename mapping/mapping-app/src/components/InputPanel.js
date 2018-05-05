import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getData } from '../data/data';
import { ButtonGroup, Button } from './Input';

const inputPanel= {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  margin: '0 auto',
  minWidth:'320px',
  maxWidth:'500px',
  height: 'fit-content',
  marginBottom: '10px',
  borderRadius: '7px',
  flexGrow:'2'
}

const question = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px',
  flexDirection: 'row',
}


const select = {
  background:'#79b6fb', 
  width: '170px', 
  margin: '0px 4px', 
  padding: '7px 4px',
  color: 'rgba(255, 255, 255, 0.87)',
}


export class InputPanel extends Component {
  constructor() {
    super()
  }

  chart = () =>
          <div name='chart' style={question}>
            <text> Output chart: </text>
            <ButtonGroup onChange={this.props.setView} value={ this.props.view }>
              <Button value={'scatter'}> Scatter </Button>
              <Button value={'map'}> Map </Button>
              <Button value={'stats'}> Analyze </Button>
            </ButtonGroup>
          </div>

  year = () =>  
          <div name='year' style={question}>
            <text> Year: </text>
              <ButtonGroup onChange={this.props.setYear} value={ this.props.year }>
                <Button value={2014}> 2014 </Button>
                <Button value={2017}> 2017 </Button>
            </ButtonGroup>
          </div>

  indepVar = () => 
          <div name='indep_var' style={question}>
            <text> Independent variable: </text>
            <select onChange={ this.props.setIndepVar } style={select}>
              { Object.keys(this.props.vars).map(key => 
                <option 
                  style={{background: '#288efa'}}
                  value={ this.props.vars[key].code }
                > 
                  { this.props.vars[key].label}
                </option>)
              }
            </select>
          </div>
        

  unit = () => 
          <div name='unit' style={question}>
            <text> Unit: </text>
            <ButtonGroup onChange={this.props.setUnit} value={ this.props.unit }>
              <Button value={'departamento'}> Department </Button>
              <Button value={'municipio'}> Municipality </Button>
            </ButtonGroup>
          </div>

   analysis = () =>  
          <div name='analysis' style={question}>
            <text> Analysis: </text>
            <select onChange={ this.props.setAnalysis } style={ select }>
              { Object.keys(this.props.vars).map(key => 
                <option 
                  value={ this.props.vars[key].code }
                > 
                  { this.props.vars[key].label}
                </option>)
              }
            </select>
          </div>

    depVar = () =>
          <div name='dep_var' style={question}>
            <text> Dependent variable: </text>
            <select onChange={ this.props.setDepVar } style={select}>
                { Object.keys(this.props.vars).map(key => 
                  <option 
                    value={ this.props.vars[key].code }
                    style={{background: '#288efa'}}
                  > 
                    { this.props.vars[key].label}
                  </option>)
                }
            </select>
          </div>

    configs = () => {
      return {
        map: [this.year, this.unit, this.depVar],
        scatter: [this.year, this.unit, this.depVar, this.indepVar],
        stats: [this.year, this.unit, this.depVar, this.indepVar, this.analysis]
      }
    }
      
  render() {
    return(
      <div name='inputPanel' style={inputPanel}>
        
        <text style={{margin: '30px 0px 7px 0px'}}> View </text>
        <div name='view' style={{padding: '10px', boxShadow: '#aeaef375 0px 0px 3px', borderRadius: '4px'}}>
          {this.chart()}
        </div>

        <text style={{margin: '30px 0px 7px 0px'}}> Configuration </text>
        <div name='config' style={{padding: '10px', boxShadow: '#aeaef375 0px 0px 3px', borderRadius: '4px'}}>
          {this.configs()[this.props.view].map(input => input())}
        </div>

      </div>
    )
  }
}

InputPanel.propTypes = {
  setDepVar: PropTypes.func.isRequired,
  setIndepVar: PropTypes.func.isRequired,
  setYear: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  setUnit: PropTypes.func.isRequired,
  setAnalysis: PropTypes.func.isRequired,
}
