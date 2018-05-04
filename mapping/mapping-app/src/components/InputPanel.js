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

export class InputPanel extends Component {
  constructor() {
    super()
  }

  render() {
    return(

      <div name='inputPanel' style={inputPanel}>

        <div name='view' style={question}>
          <b> View: </b>
          <ButtonGroup onChange={this.props.setView} value={ this.props.view }>
            <Button value={'chart'}> Scatter </Button>
            <Button value={'map'}> Map </Button>
          </ButtonGroup>
        </div>

        <div name='year' style={question}>
          <b> Year: </b>
            <ButtonGroup onChange={this.props.setYear} value={ this.props.year }>
              <Button value={2014}> 2014 </Button>
              <Button value={2017}> 2017 </Button>
          </ButtonGroup>
        </div>

        <div name='dep_var' style={question}>
          <b> Dependent variable: </b>
          <select onChange={ this.props.setDepVar }>
              { Object.keys(this.props.vars).map(key => 
                <option value={ this.props.vars[key].code }> 
                  { this.props.vars[key].label}
                </option>)
              }
          </select>
        </div>

        <div name='indep_var' style={question}>
          <b> Independent variable: </b>
          <select onChange={ this.props.setIndepVar }>
            { Object.keys(this.props.vars).map(key => 
              <option value={ this.props.vars[key].code }> 
                { this.props.vars[key].label}
              </option>)
            }
          </select>
        </div>

        <div name='unit' style={question}>
          <b> Unit: </b>
          <select onChange={ this.props.setUnit }>
              <option value={'departamento' }> Department </option>
              <option value={'municipio' }> Municipality </option>
          </select>
        </div>

        <div name='analysis' style={question}>
          <b> Analysis: </b>
          <select onChange={ this.props.setAnalysis }>
            { Object.keys(this.props.vars).map(key => 
              <option value={ this.props.vars[key].code }> 
                { this.props.vars[key].label}
              </option>)
            }
          </select>
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
