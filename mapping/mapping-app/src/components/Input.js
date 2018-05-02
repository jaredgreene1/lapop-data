import React from 'react';


const unhoverButton = {
  display: 'flex',
  borderRadius: '10px',
  margin: '0px 2px 0px 2px',
  border: '0',
  padding: '7px',
  background: '#ebeeff',
  height: 'fit-content',
  cursor: 'pointer',
}

const hoverButton = {
  display: 'flex',
  borderRadius: '10px',
  margin: '0px 2px 0px 2px',
  border: '0',
  padding: '7px',
  background: 'rgb(70, 130, 180)',
  height: 'fit-content',
  color: 'white',
  cursor: 'pointer',
}

export class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    }
  }

  onHover = () => this.setState({hovered: true});
  onUnhover = () => this.setState({hovered: false});
  
  getStyle = () => {
    if (this.state.hovered)
      return hoverButton 
    else
      return unhoverButton
  }


  render() {
    return (
      <button 
        style={this.getStyle()} 
        onMouseOver={this.onHover}
        onMouseOut={this.onUnhover}
        onClick={this.props.callback}
      > 
        {this.props.text} 
      </button>
    );
  }
}

const select = {
   WebkitAppearance: 'button',
   WebkitBorderRadius: '2px',
   WebkitBoxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
   WebkitPaddingEnd: '20px',
   WebkitPaddingStart: '2px',
   WebkitUserSelect: 'none',
   border: '1px solid #AAA',
   color: '#555',
   fontSize: 'inherit',
   margin: '20px',
   overflow: 'hidden',
   padding: '5px 10px',
   textOverflow: 'ellipsis',
   whiteSpace: 'nowrap',
   width: '300px',
}

export class Select extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <select onChange={this.props.onChange} style={select}> 
        <option value="" disabled selected hidden> Please Choose... </option>
        {this.props.options} 
      </select>
    );
  }
}

