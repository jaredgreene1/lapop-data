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
            Please select one dependent variable and at least 2 independent variables 
          </h1>                                                           
        </div>)   
		return(
			<div style={{backgroundColor:'white'}}>
        <h3 style={{
              borderBottom: '1px solid grey', 
              paddingBottom: '5px', 
              margin:'0'
        }}> 
          { 'Ordinary Least Squared Analysis' } 
        </h3>
        <br />
        <b> Model information: </b>
        <br />
        <p style={outputSect}> Dependent variable: 
          <ul style={output}>
            <li> { this.props.endogVar.label } </li>
          </ul>
        </p>
        <p style={outputSect}> Independent variables:
          <ul>
            { this.props.exogVars.map((xVar, idx) => 
                <li style={output}> {xVar.label} </li>)
            } 
          </ul>
        </p> 

        <br />
        <b> Analysis: </b>
        <p style={outputSect}> R-squared: 
          <ul>
            <li style={output}> 
              {this.props.output.R2.toFixed(3)} 
            </li>
          </ul>
        </p>  
        <p style={outputSect}> Coefs: 
          <ul>
            { this.props.output.coef.map((coef, idx) =>
                <li style={output}> 
                  {coef.toFixed(2)} ({this.props.exogVars[idx].label}) 
                </li>)
            }
          </ul>
        </p>  
			</div>
		)
	}
}

