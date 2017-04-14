import React from 'react'
import { connect } from 'react-redux'

@connect((store)=>{
  return {
    results: store.search.subreddits
  }
})
export default class SearchResults extends React.Component {
  _addToStack (sr) {
    this.props.dispatch({type: "ADD_SUBREDDIT", payload: sr})
  }
  _clearResults(e) {
    if(!e.target.classList.contains("sr-res")) {
      this.props.dispatch({type: "CLEAR_FOUND_SUBREDDITS"})
      document.removeEventListener('mouseup', this._clearResults)
    }
  }
  render () {
    const { all, isLoading } = this.props.results;
    const loading = isLoading ? <img src="./res/ellipsis.gif" className="loading-img" /> : null;
    if(all.length) {
      document.addEventListener('mouseup', this._clearResults.bind(this))
      return (
        <div className="search-results">{all.map((sr,idx) => {
            return (
              <span className="sr-res" key={idx}
                onClick={this._addToStack.bind(this,sr)}>
                {sr.name}
              </span>
            );
          })}
          {loading}
        </div>
      );
    } else return null;
  }
}
