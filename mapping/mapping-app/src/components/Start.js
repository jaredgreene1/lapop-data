import React, { Component } from 'react';
import { codes17 } from '../data/varcoding';
import { Select } from './Input'

export class Start extends Component {
  constructor() {
    super()
  }


  render() {
    return(
      <div>
        <b> Select a dependent variable </b>
        <Select 
          onChange={ this.props.setDepVar }
          options=
            { Object.keys(codes17).map(key => 
              <option value={ codes17[key].code }> 
                { codes17[key].label}
              </option>)
            }
        />
        <br />
        <b> Select an independent variable </b>
        <Select 
          onChange={ this.props.setIndepVar }
          options=
            { Object.keys(codes17).map(key => 
              <option value={ codes17[key].code }> 
                { codes17[key].label}
              </option>)
            }
        />
      </div>
    )
  }
}

