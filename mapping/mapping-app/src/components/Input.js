import React from 'react';


const activeButton = {
  margin: '0px 5px',
  border: '1px solid #aeaef375',
  padding: '7px 4px',
  width: '80px',
  background: '#ebeeff73',
  color: '#ffffff',
  cursor: 'pointer',
}

const button = {
  margin: '0px 5px',
  border: '1px solid #aeaef375',
  padding: '7px 4px',
  width: '80px',
  background: '#ebeeff0a',
  color: '#ffffff87',
  cursor: 'pointer',
}
export class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button 
        style={ this.props.active ? activeButton : button } 
        onClick={ this.props.onClick }
        value={ this.props.value }
        > 
        {this.props.children} 
      </button>
    );
  }
}


export class ButtonGroup extends React.Component {
  constructor() {
    super();
  }

  handleClick = (e) => {this.props.onChange(e.target.value)}
  render(){
    return (
      <div>
        {React.Children.map(this.props.children, child => 
          React.cloneElement(child, {
            onClick: this.handleClick,
            active: this.props.value == child.props.value
          })
        )}
      </div>
    )
  }
}

