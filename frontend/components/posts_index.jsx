import React from 'react'
import Post from './post'
import { connect } from 'react-redux'

function makePostItems(postsData) {
  return postsData.map((postJSON,idx) => {
    return <Post key={idx} post={postJSON} />
  });
}

const PostsIndex = React.createClass({
  getInitialState () {
    return {scrolled: false}
  },
  _scrollListener (e) {
    let postsCont = e.target
    if(postsCont.scrollHeight - postsCont.scrollTop == postsCont.clientHeight)
      this.setState({scrolled: true});
  },
  componentWillMount () {
    this.props.fetchPosts();
  },
  componentDidUpdate(prevProps, prevState) {
    if(this.props.triggered && !prevProps.triggered || this.state.scrolled) {
      const { all } = this.props.posts
      let after = ""
      if(all.length) after = 't3_' + all[all.length - 1].id;
      this.props.fetchPosts(after)
      this.setState({scrolled: false})
    }
  },
  render () {
    const { all, isLoading } = this.props.posts
    let postEls = makePostItems(all)
    const loading = (isLoading) ? <img src="./res/ellipsis.gif" className="loading-img" /> : null;
    return (
      <section className="posts-index" onScroll={this._scrollListener}>
        {postEls}
        {loading}
      </section>
    );
  }
})

export default PostsIndex
