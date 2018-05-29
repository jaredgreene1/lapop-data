import React, { Component } from 'react';
import normalize from 'normalize.css';


import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel.js';
import IntroInfo from './components/IntroInfo.js';
import { getVars } from './data/varcoding.js';


const section1 = {
  backgroundSize: 'cover',
  background: 'linear-gradient(to right bottom, #ffffff, #dbdbedcf',
  padding: '30px',
  minHeight: '100vh',
  boxSizing: 'border-box',
  color: '#19191a',
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

  resetInvalidVars = (year) => {
    const vars = getVars(year)
    this.setState({
      depVar: vars[this.state.depVar.code] || vars['pol1'],
      indepVar: vars[this.state.indepVar.code] || vars['www1'],
      exogVars: this.state.exogVars.map(val => vars[val.code] || vars['www1'])
    })
  }

  callbacks = () => {
    return {
      setDepVar: ({value, label}) => {
        this.setState({depVar: this.state.vars[value]})
      },
      setIndepVar: ({value, label}) => {
        this.setState({indepVar: this.state.vars[value]})
      },
      setView: view => this.setState({ view: view }),
      setUnit: unit => {
        this.setState({ unit: unit })
      },
      setYear: year => {
        this.resetInvalidVars(year)
        this.setState({ 
          year: year,
          vars: getVars(year)
        })
      },
      setExogVars: exogVars => {
        this.setState({exogVars: exogVars.map(({value, label}) => this.state.vars[value])})
      },
    }
  }

  render() {
    return(
      <div name='background' >
        <section name='section1' style={ section1 }>
          <h1> Networks of Guatemala - Data Explorer </h1>
          <hr />
          <IntroInfo />
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
