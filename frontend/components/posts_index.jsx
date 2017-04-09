import React from 'react'
import Post from './post'
import { connect } from 'react-redux'
import fetchPosts from '../actions/fetch_posts'

@connect((store)=>{
  return {
    posts: store.posts
  }
})
export default class PostsIndex extends React.Component {
  componentWillMount () {
    this.props.dispatch(fetchPosts())
  }
  render () {
    let posts = this.props.posts.map((postJSON,idx) => {
      return <Post key={idx} post={postJSON} />
    });
    return (
      <section className="posts-index">
        {posts}
      </section>
    );
  }
}
