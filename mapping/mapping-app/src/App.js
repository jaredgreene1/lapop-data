import React, { Component } from 'react';
import { Map, MapControls } from './components/Map.js';
import ScatterChart from './components/Scatter.js';
import { InputPanel } from './components/InputPanel';

import { OutputPanel } from './components/OutputPanel.js';

import background from './background_blue.jpeg';

const section1 = {
  backgroundImage: "url(" + background + ")",
  padding: '30px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minHeight: '95vh',
  color: 'white',
  padding: '15px',
}

class App extends Component {
  constructor() {
    super()
    this.state ={
      depVar: 'prot3',
      indepVar: 'prot3',
  }
}

  setDepVar = (e) => this.setState({ depVar: e.target.value})
  setIndepVar = (e) => this.setState({ indepVar: e.target.value})


  render() {
    return(
      <div>
        <section name='section1' style={ section1 }>
          <h1> LAPOP Explorer - Guatemala </h1>
          <hr />
          <div style={{display: 'flex', flexWrap:'wrap'}}> 
            <InputPanel setDepVar={ this.setDepVar } setIndepVar={ this.setIndepVar }/>
            <OutputPanel depVar={ this.state.depVar } indepVar={ this.state.indepVar }/> 
          </div>
        </section>
        <section name='section2'>
        </section>
      </div>


    )
  }
}

export default App;
