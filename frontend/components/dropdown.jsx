import React, { PropTypes } from 'react'

const Dropdown = React.createClass({
  render () {
    const klasses = "dropdown " + this.props.otherClasses;
    return (
      <div className={klasses} style={{display: this.props.display}}>
        {this.props.ddContent}
      </div>
    );
  }
})

export default Dropdown
