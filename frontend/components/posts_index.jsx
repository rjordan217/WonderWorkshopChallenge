import React from 'react'
import Post from './post'
import { connect } from 'react-redux'
import fetchUnsortedPosts from '../actions/fetch_unsorted_posts'

@connect((store)=>{
  return {
    unsortedPosts: store.unsortedPosts
  }
})
export default class PostsIndex extends React.Component {
  componentWillMount () {
    this.props.dispatch(fetchUnsortedPosts())
  }
  render () {
    let posts = this.props.unsortedPosts.map((postJSON,idx) => {
      return <Post key={idx} post={postJSON} />
    });
    return (
      <section className="posts-index">
        {posts}
      </section>
    );
  }
}
