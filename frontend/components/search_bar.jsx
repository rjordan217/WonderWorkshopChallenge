import React from 'react'
import { connect } from 'react-redux'
import fetchSearch from '../actions/fetch_search'
import SortByButton from './sort_by_button'

@connect((store) => {
  const { searchParams } = store.search
  return { searchParams, loggedIn: store.haveOAuthToken }
})
class SearchBar extends React.Component {
  componentWillMount () {
    this.qUpdate = this.props.searchType.toUpperCase() + "_SEARCH_Q_UPDATED";
    this.sortUpdate = this.props.searchType.toUpperCase() + "_SEARCH_SORT_BY_UPDATED";
    this.props.dispatch({type: this.qUpdate,payload: this.props.defVal});
  }
  _checkLoggedIn() {
    if(!this.props.loggedIn) {
      this.props.dispatch({type: "DISPLAY_ERROR", payload: "Must be logged in to search."});
      return false;
    } else return true;
  }
  _handleChange(e) {
    this.props.dispatch({type: this.qUpdate, payload: e.target.value});
  }
  _updateSort(e) {
    if(e.target.value)
      this.props.dispatch({type: this.sortUpdate, payload: e.target.value});
  }
  _setEmpty (e) {
    if(e.target.value == this.props.defVal && this._checkLoggedIn())
      this.props.dispatch({type: this.qUpdate,payload: ""});
  }
  _submitSearch () {
    if(this._checkLoggedIn()) {
      const { dispatch, searchType, searchParams } = this.props;
      dispatch({type: "FETCHING_" + searchType.toUpperCase() + "_SEARCH"})
      if(searchType == 'sr') dispatch(fetchSearch(searchParams[searchType], searchType));
    }
  }
  _submitIfEnter (e) {
    if(e.keyCode == 13) this._submitSearch();
  }
  render () {
    const { searchParams, searchType, loggedIn } = this.props

    return (
      <div className="search-bar" onClick={this._checkLoggedIn.bind(this)}>
        <input type="search"
          onClick={this._setEmpty.bind(this)}
          onChange={this._handleChange.bind(this)}
          value={searchParams[searchType].q}
          onKeyDown={this._submitIfEnter.bind(this)}
          disabled={!loggedIn}
          className="search-input"/>
        <button
          onClick={this._submitSearch.bind(this)}
          disabled={!loggedIn}
          className="search-bttn"
          >
        </button>
        <SortByButton loggedIn={loggedIn} updateSort={this._updateSort.bind(this)} />
      </div>
    );
  }
}

export default SearchBar
