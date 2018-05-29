import React, { Component } from 'react'
import PropTypes from 'prop-types';

const intro = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  margin: '0 auto 50px auto',
  minWidth:'320px',
  maxWidth: '1150px',
  height: 'fit-content',
  flexGrow:'2',
  background: '#ffffff0d',
  borderRadius: '5px',
  color: '#3a3939',
  background: 'rgba(255, 255, 255, 0.65)',

}


class Section extends Component {
  constructor(){
    super()
    this.state = {
      expanded: false
    }
  }

  introDiv = () => {
    return {
      borderBottom: '1px solid #a4a4a45e',
      marginBottom: '15px',
    }
  }

  title = () => {
    return {
      margin: '1px',
    }
  }

  expandedText = () => {
    return {
      fontSize: 'smaller',
      color: '#615d5d',
      padding: '10px',
      background: '#e5e5ffa6',
    }

  }

  arrow = () => {
    return {
      float: 'right',
      fontSize: 'x-large',
    }
  }

  handleClick = () =>
    this.setState( (prevState, props) => {
      return {
        expanded: !prevState.expanded
      }
    })

  render() {
    return (
      <div 
        name='intro_section' 
        onClick = {this.handleClick} 
        style={this.introDiv()}
      >
        <text style={ this.title() }> 
          { this.props.title } 
        </text>
        { this.state.expanded ? 
          <text style={ this.arrow() }> ⌃ </text> : 
          <text style={ this.arrow() }> ⌄  </text> 
        }

        { this.state.expanded &&
          <p style = { this.expandedText() }>
            { this.props.text }
          </p>
        }
      </div>
  )}
}


const IntroInfo = () => { 
     return (
         <div name='introPanel' style={ intro }>
            <Section title='About this application' text='This application is part of a research project called Networks of Guatemala' /> 
            <Section title='Instructions for use' text='In the view panel, select a data view. Then, confgure the visualization by toggling the data in the configuration panel' /> 
            <Section title='Data source' text='This data is from the America Barometers survey effort run by LAPOP' /> 
            <h />
        </div>
        )
     }

  export default IntroInfo;
