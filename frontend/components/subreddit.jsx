import React from 'react'
import PostsIndex from './posts_index'
import fetchPostsBySR from '../actions/fetch_posts_by_sr'
import updateSubscription from '../actions/update_subscription'

const Subreddit = React.createClass({
  getInitialState () {
    return {filter: 'new'};
  },
  componentWillUpdate(nextProps, nextState) {
    if(this.state.filter !== nextState.filter) {
      this.props.dispatch({type: 'CHANGE_SR_FILTER', payload: this.props.sr})
      this.props.dispatch(fetchPostsBySR(this.props.sr,nextState.filter))
    }
  },
  _changeFilter(e) {
    this.setState({filter: e.target.value})
  },
  _toggleSubscription() {
    const { name, amSubscribed } = this.props.sr,
        action = amSubscribed ? 'unsub' : 'sub';
    this.props.dispatch(updateSubscription(action,name))
  },
  _minimize() {
    this.props.dispatch({type: "HIDE_SUBREDDIT", payload: this.props.sr})
  },
  render () {
    const { name, isLoading, title, header_img, amSubscribed, all } = this.props.sr
    let posts = {all, isLoading},
        fetchCB = (after = "") => {
          this.props.dispatch({type:"FETCHING_SR_POSTS",payload: this.props.sr})
          this.props.dispatch(
            fetchPostsBySR(this.props.sr,this.state.filter,after)
          )
        };
    return (
      <div className="sr-item">
        <button className={"sr-sbscrb" + (amSubscribed ? "" : " not-subd")}
          title="Toggle subscription" onClick={this._toggleSubscription}></button>
        <button className="sr-min" title="Hide" onClick={this._minimize}>-</button>
        <div className="sr-sort-by">
          Sort by:
          <label><input type="radio" name="filter" value="hot"
            checked={this.state.filter == "hot"} onChange={this._changeFilter}/>
          Hot!</label>
          <label><input type="radio" name="filter" value="new"
            checked={this.state.filter == "new"} onChange={this._changeFilter} />
          New</label>
        </div>
        <div className="sr-dets group">
          <div className="sr-img-container"><img className="sr-img" src={header_img} /></div>
          <h2 className="sr-name">{name}</h2>
        </div>
        <div className="sr-posts-container">
          <PostsIndex posts={posts} showBy="sr" fetchPosts={fetchCB} />
        </div>
      </div>
    );
  }
})

export default Subreddit
