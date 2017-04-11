import React from 'react'

const SearchBar = React.createClass({
  getInitialState () {
    return {
      searchParams: "",
      inProgress: false
    }
  },
  _handleChange(e) {
    this.setState({searchParams: e.target.value});
  },
  _setEmpty (e) {
    if(e.target.value == this.props.defVal)
    e.target.value = "";
  },
  _submitSearch () {
    this.props.searchFunction(this.state.searchParams)
    this.setState({inProgress: true})
  },
  _submitIfEnter (e) {
    if(e.keyCode == 13) this._submitSearch();
  },
  render () {
    return (
      <div className="search-bar">
        <input type="search"
          defaultValue={this.props.defVal}
          onClick={this._setEmpty}
          onChange={this._handleChange}
          className="search-input"/>
        <button
          onClick={this._submitSearch}
          disabled={this.state.inProgress}
          onKeyDown={this._submitIfEnter}
          className="search-bttn"
          >
        </button>
      </div>
    );
  }
})

export default SearchBar
