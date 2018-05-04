import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { codes17 } from '../data/varcoding';

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
  boxShadow: 'black 1px 1px 22px -8px',
  background: 'linear-gradient( #3397faeb, #99c2ff)',
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
        <div name='dep_var' style={question}>
          <b> Dependent variable: </b>
          <select onChange={ this.props.setDepVar }>
              { Object.keys(codes17).map(key => 
                <option value={ codes17[key].code }> 
                  { codes17[key].label}
                </option>)
              }
          </select>
        </div>
        <div name='indep_var' style={question}>
          <b> Independent variable: </b>
          <select onChange={ this.props.setIndepVar }>
            { Object.keys(codes17).map(key => 
              <option value={ codes17[key].code }> 
                { codes17[key].label}
              </option>)
            }
          </select>
        </div>
        <div name='year' style={question}>
          <b> Year: </b>
          <select onChange={ this.props.setYear }>
            { Object.keys(codes17).map(key => 
              <option value={ codes17[key].code }> 
                { codes17[key].label}
              </option>)
            }
          </select>
        </div>
        <div name='view' style={question}>
          <b> View: </b>
          <select onChange={ this.props.setView }>
            { Object.keys(codes17).map(key => 
              <option value={ codes17[key].code }> 
                { codes17[key].label}
              </option>)
            }
          </select>
        </div>
        <div name='analysis' style={question}>
          <b> Analysis: </b>
          <select onChange={ this.props.setAnalysis }>
            { Object.keys(codes17).map(key => 
              <option value={ codes17[key].code }> 
                { codes17[key].label}
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
