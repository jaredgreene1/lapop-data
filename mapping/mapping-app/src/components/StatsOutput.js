import React, { Component } from 'react';

export class StatsOutput extends Component {
  constructor() {
    super()
  }

	render() {
		return(
			<div style={{backgroundColor:'white'}}>
        <h3> { 'Ordinaty Least Squared Analysis' } </h3>
        <hr />
          <b> R-squared: </b>  { this.props.output.R2.toFixed(3) }
          <br />
          <b> Coefs: </b>  { this.props.output.coef.map(coef =>
            coef.toFixed(2) + ', ')
          }
			</div>
		)
	}
}

