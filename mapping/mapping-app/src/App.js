import React, { Component } from 'react';

import background from './background_blue.jpeg';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel.js';
import { getVars } from './data/varcoding.js';

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
      view: '',
      depVar: 'indig',
      indepVar: '',
      unit: '',
      year: '2017',
      analysis: '',
      vars: getVars('2017')

      
  }
}

  callbacks = () => {
    return {
      setDepVar: e => {
        const varInfo = this.state.vars[e.target.value]
        this.setState({ depVar: varInfo})
      },
      setIndepVar: e => {
        const varInfo = this.state.vars[e.target.value]
        this.setState({ indepVar: varInfo})
      },
      setView: e => this.setState({ view: e.target.value}),
      setUnit: e => this.setState({ unit: e.target.value}),
      setYear: e => this.setState({ 
        year: e.target.value,
        vars: getVars(e.target.value)
      }),
      setAnalysis: e => this.setState({ analysis: e.target.value}),
    }
  }

  render() {
    return(
      <div>
        <section name='section1' style={ section1 }>
          <h1> LAPOP Explorer - Guatemala </h1>
          <hr />
          <div style={{display: 'flex', flexWrap:'wrap'}}> 
            <InputPanel {...this.callbacks()} /> 
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
