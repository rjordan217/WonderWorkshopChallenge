import React from 'react'
import Post from './post'
import { connect } from 'react-redux'
import fetchPosts from '../actions/fetch_posts'

function makePostItems(postsData) {
  return postsData.map((postJSON,idx) => {
    return <Post key={idx} post={postJSON} />
  });
}

@connect(store => {return {}})
export default class PostsIndex extends React.Component {
  componentWillMount () {
    this.props.dispatch({type: 'FETCHING_POSTS'})
    this.props.dispatch(fetchPosts())
  }
  render () {
    const { all, isLoading } = this.props.posts
    let postEls = makePostItems(all)
    const loading = (isLoading) ? <img src="./res/ellipsis.gif" className="loading-img" /> : null;
    return (
      <section className="posts-index">
        {postEls}
        {loading}
      </section>
    );
  }
}
