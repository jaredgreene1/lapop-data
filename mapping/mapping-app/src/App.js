import React, { Component } from 'react';
import normalize from 'normalize.css';


import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel.js';
import { getVars } from './data/varcoding.js';


const section1 = {
  backgroundSize: 'cover',
  background: 'linear-gradient(to right bottom, rgb(1, 1, 18), rgba(79, 79, 179, 0.81))',
  padding: '30px',
  minHeight: '100vh',
  boxSizing: 'border-box',
  color: 'white',
  padding: '15px',
  overflow: 'auto',
}

class App extends Component {
  constructor() {
    super()
    this.state ={
      view: 'scatter',
      depVar: getVars('2017')['pol1'], 
      indepVar: getVars('2017')['www1'], 
      exogVars: [getVars('2017')['www1'], getVars('2017')['prot3']], 
      unit: 'municipio',
      year: '2017',
      vars: getVars('2017')
  }
}

  callbacks = () => {
    return {
      setDepVar: ({value, label}) => {
        console.log(value)
        this.setState({depVar: this.state.vars[value]})
      },
      setIndepVar: ({value, label}) => {
        console.log(value)
        this.setState({indepVar: this.state.vars[value]})
      },
      setView: view => this.setState({ view: view }),
      setUnit: unit => this.setState({ unit: unit }),
      setYear: year => this.setState({ 
        year: year,
        vars: getVars(year)
      }),
      setExogVars: exogVars => {
        this.setState({exogVars: exogVars.map(({value, label}) => this.state.vars[value])})
      },
    }
  }

  render() {
    return(
      <div name='background' >
        <section name='section1' style={ section1 }>
          <h1> LAPOP Explorer - Guatemala </h1>
          <hr />
          <div style={{display: 'flex', flexWrap:'wrap'}}> 
            <InputPanel {...this.callbacks()} {...this.state} /> 
            <OutputPanel {...this.state}/> 
          </div>
        </section>
        <section name='section2'>
        </section>
      </div>


    )
  }
}

export default App;
