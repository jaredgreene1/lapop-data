import React, { Component } from 'react';

const box = {
  boxShadow: '4px 4px 32px -13px black',
  margin: '10px',
  paddingLeft: '4px',
  paddingRight: '4px',
  width: 'fit-content',
  position: 'absolute',
  background: '#797575d9',
  color: 'white',
  fontSize: '12px',
}

class InfoBox extends Component {
  constructor() {
    super()
  }


  render() {
    return(
      <div style={box}>
        <p> <b> Department: </b> {this.props.department} </p>
        { this.props.municipality ? 
          <p> <b> Municipality: </b> {this.props.municipality} </p> : null
        }
        <p> <b> Indigenous pop.: </b> { (this.props.data.indig*100).toFixed(1) + '%' } </p>
        <p> <b> Internet Usage: </b> { (this.props.data.www1*1).toFixed(1)} </p>
        <p> <b> Political interest: </b> { (this.props.data.pol1*1).toFixed(1)} </p>
        <p> <b> Protest particip.: </b> { (this.props.data.prot3*1).toFixed(1) + '%'} </p>
      </div>
    )
  }
}

export default InfoBox;
