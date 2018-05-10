import React, { Component } from 'react';

const collapsed = {
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

const expanded= {
  boxShadow: '4px 4px 32px -13px black',
  margin: '10px',
  paddingLeft: '4px',
  paddingRight: '4px',
  position: 'absolute',
  background: '#797575d9',
  color: 'white',
  fontSize: '12px',
  left: '0',
  top: '7%',
  bottom: '0',
  right: '0'
}

const closeButton = {
  position: 'absolute',
  right: '0%',
  top: '0%',
  border: 'none',
  background: 'none',
  color: 'white',
  fontSize: 'medium'
  }


class InfoBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: this.props.expanded
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    return {expanded: nextProps.expanded}
  }

  render() {
    const dept = this.props.data.NAME_1
    const muni = this.props.data.NAME_2
    const data = this.props.data.data
    const variable = this.props.variable
    const value = data[variable.code]
    const vars = this.props.vars

    return(
      <div 
        onClick={ this.props.collapse } 
        style={ this.state.expanded ? expanded: collapsed }
      >
        { this.state.expanded && 
          <button onClick={ this.props.collapse} style={ closeButton }> 
            x 
          </button> }

        <p> <b> Department: </b> { dept } </p>
        { muni && <p> <b> Municipality: </b> { muni } </p> }
        { value ? <p> { variable.label } :  {value.toFixed(2)} out of {variable.high} </p>
          : <p> No data available </p>}
        { (this.state.expanded && value) && 
            <div> 
              { Object.keys(vars).map(key => 
                <p> 
                  { vars[key].label }: { data[key].toFixed(2) } out of { vars[key].high } 
                </p> 
              )}
            </div>
        }
      </div>
    )
  }
}

export default InfoBox;
