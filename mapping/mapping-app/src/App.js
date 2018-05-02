import React, { Component } from 'react';
import { Map, MapControls } from './components/Map.js';
import { Start } from './components/Start';

import background from './background.svg';

const section1 = {
  backgroundImage: "url(" + background + ")",
  padding: '30px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '95vh',
  color: 'white',
  padding: '15px',
}

const dataInterface = {
  display: 'flex',
  flexWrap: 'wrap',
}

const controls = {
  display: 'flex',
  margin: '10px',
  flexGrow: '2',

}

const output = {
  display: 'flex',
  margin: '10px',
  flexGrow: '5'
}

class App extends Component {
  constructor() {
    super()
    this.state ={
      depvar: '',
      indepvar: '',
  }
}

  setDepVar = (e) => this.setState({ depvar: e.target.value})


  render() {
    return(
      <div>
        <section name='section1' style={ section1 }>
          <h1> LAPOP Explorer - Guatemala </h1>
          <p> Application for exploring LAPOP data for Guatemala </p>
          <hr />
          <div style={ dataInterface }> 
            <div name='controls' style={ controls }>
              <Start setDepVar={ this.setDepVar }/>
            </div>
            <div name='output' style={ output }>
              {this.state.depvar ? <Map code={ this.state.depvar }/> : null}  
            </div>
          </div>
        </section>
        <section name='section2'>
          <div style={{height:'100vh', background:'grey'}}>
            <h1> SO HOW DOES THIS WORK? </h1>
          </div>
        </section>
      </div>


    )
  }
}

export default App;
