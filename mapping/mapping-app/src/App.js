import React, { Component } from 'react';
import { Map, MapControls } from './components/Map.js';
import './App.css'

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div> 
        <h1> Map of Guatemala </h1>
        <hr />
        <Map code={ this.state.code } />
      </div>
    )
  }
}

export default App;
