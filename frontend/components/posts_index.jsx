import React from 'react'
import Post from './post'
import { connect } from 'react-redux'
import fetchPosts from '../actions/fetch_posts'

function makePostItems(postsData,idxOffset = 0) {
  return postsData.map((postJSON,idx) => {
    return <Post key={idx + idxOffset} post={postJSON} />
  });
}

export default class PostsIndex extends React.Component {
  componentWillMount () {
    this.props.dispatch({type: 'FETCHING_POSTS'})
    this.props.dispatch(fetchPosts())
  }
  _scrollListener (e) {
    let allPosts = e.target
    if(allPosts.scrollHeight - allPosts.scrollTop == allPosts.clientHeight &&
      this.props.haveOAuthToken) {
      const posts = this.props.posts.all,
          after = 't3_' + posts[posts.length - 1].id;
      this.props.dispatch({type: 'FETCHING_POSTS'});
      this.props.dispatch(fetchPosts(after));
    }
  }
  render () {
    const { all, isLoading } = this.props.posts
    let postEls = makePostItems(all)
    const loading = (isLoading) ? <img src="./res/ellipsis.gif" className="loading-img" /> : null;
    return (
      <section className="posts-index" onScroll={this._scrollListener.bind(this)}>
        {postEls}
        {loading}
      </section>
    );
  }
}
