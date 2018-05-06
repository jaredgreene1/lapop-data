import React, { Component } from 'react';


const output = {
  marginLeft: '10px', 
  fontFamily:'monospace'
} 

const outputSect= {
  fontSize: 'small', 
}


export class StatsOutput extends Component {
  constructor() {
    super()
  }

	render() {
    if(this.props.disabled)                 
      return(                                    
        <div>                                                             
          <h1 style={{margin: '15%', textAlign: 'center'}}>    
            Please select an an endogenous and at least 2 exogenous variables 
          </h1>                                                           
        </div>)   
		return(
			<div style={{backgroundColor:'white'}}>
        <h3> { 'Ordinary Least Squared Analysis' } </h3>
        <hr />
          <b> Model information: </b>
          <br />
          <p style={outputSect}> Endogenous variable: 
            <text style={output}>
              { this.props.endogVar.code } 
            </text>
          </p>
          <p style={outputSect}> Exogenous variables:
            { 
              this.props.exogVars.map(xVar => 
                <text  style={output}> 
                  {xVar.code} 
                </text>
              )  
            } 
          </p> 

          <br />
          <b> Analysis: </b>
          <p style={outputSect}> R-squared: 
                <text  style={output}> 
                  {this.props.output.R2.toFixed(3)} 
                </text>
          </p>  
          <p style={outputSect}> Coefs: 
            { this.props.output.coef.map(coef =>
                <text style={output}>
                  {coef.toFixed(2)}
                </text>
              )
            }
           </p>  
			</div>
		)
	}
}

