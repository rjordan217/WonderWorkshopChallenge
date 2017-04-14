import React from 'react'

const SortByButton = React.createClass({
  getInitialState () {
    return {
      showDropdown: false
    };
  },
  _toggleDD() {
    this.setState({showDropdown: !this.state.showDropdown})
  },
  render () {
    let display = this.state.showDropdown ? "block" : "none";
    return (
      <button className="mod-search" disabled={!this.props.loggedIn}
        onClick={this._toggleDD}>
        {this.state.showDropdown ? '^' : '∨'}
        <select onClick={this.props.updateSort}
          className="dropdown" size="4" style={{display}}>
          <optgroup label="Sort By:">
            <option value="relevance">Relevance</option>
            <option value="new">New</option>
            <option value="hot">Hot!</option>
          </optgroup>
        </select>
      </button>
    )
  }
})

export default SortByButton
