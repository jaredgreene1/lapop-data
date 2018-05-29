import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { introText } from '../copy';

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
      <div>
        <div 
          name='intro_section' 
          onClick = {this.handleClick} 
          style={this.introDiv()}
        >
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <text style={ this.title() }> 
            { this.props.title } 
          </text>
          { this.state.expanded ? 
            <text style={ this.arrow() }> ⌃ </text> : 
            <text style={ this.arrow() }> ⌄  </text> 
          }
          </div>

          { this.state.expanded &&
               <div style = { this.expandedText() }>
                { this.props.text }
               </div>

          }
        </div>
      </div>
  )}
}


const IntroInfo = props =>  
       <div name='introPanel' style={ intro }>
          {Object.keys(introText(props.lang)).map(key => 
            <Section title={ key } text={ introText(props.lang)[key] }/>)
          }
        </div>

  export default IntroInfo;
