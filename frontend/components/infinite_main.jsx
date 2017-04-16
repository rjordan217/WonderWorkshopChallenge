import React from 'react'
import PostsIndex from './posts_index'
import fetchPosts from '../actions/fetch_posts'
import fetchSearch from '../actions/fetch_search'

const InfiniteMain = React.createClass({
  getInitialState() {
    return {
      scrolled: false,
      switched: false
    };
  },
  _scrollListener (e) {
    let main = e.target
    if(main.scrollHeight - main.scrollTop == main.clientHeight &&
      this.props.loggedIn) this.setState({scrolled: true});
  },
  componentDidUpdate(prevProps, prevState) {
    const { showBy, posts } = this.props;
    if(prevProps.showBy == 'all' && showBy == 'search') this.setState({switched: true});
    if(this.state.switched && posts.all.length) this.setState({switched: false});
  },
  render () {
    const { posts, showBy, searchParams, dispatch } = this.props
    const { scrolled, switched } = this.state

    let fetchAndReset
    if(showBy == 'search') {
      fetchAndReset = function(after = "") {
        dispatch(fetchSearch(searchParams,'link'))
        this.setState({scrolled: false})
      }.bind(this)
    } else {
      fetchAndReset = function(after = "") {
        dispatch(fetchPosts(after))
        this.setState({scrolled: false})
      }.bind(this)
    }

    return (
      <main onScroll={this._scrollListener}>
        <PostsIndex posts={posts} triggered={scrolled || switched}
          fetchPosts={fetchAndReset} />
      </main>
    )
  }
})

export default InfiniteMain
