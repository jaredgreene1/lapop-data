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
      view: 'map',
      depVar: undefined, 
      indepVar: undefined, 
      exogVars: [], 
      unit: 'departamento',
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
      <div>
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
