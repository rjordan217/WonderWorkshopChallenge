import React, { PropTypes } from 'react'
import { store } from '../store'
import { connect } from 'react-redux'
import NavBar from './nav_bar'
import SubscriptionsMenu from './subscriptions_menu'
import InfiniteMain from './infinite_main'
import SubredditsIndex from './subreddits_index'
import ErrorDisplay from './error_display'
import requestOAuthToken from '../reddit_lib/request_oauth_token'
import refreshOAuthToken from '../reddit_lib/refresh_oauth_token'
import verifyQString from '../reddit_lib/verify_q_string'
import storeTokens from '../reddit_lib/store_tokens'
import fetchPosts from '../actions/fetch_posts'

@connect((store) => {
  return {
    haveOAuthToken: store.haveOAuthToken,
    bySubreddit: store.bySubreddit,
    foundPosts: store.search.posts,
    mainPosts: store.posts,
    postParams: store.search.searchParams.posts
  }
})
export default class Main extends React.Component {
  componentDidMount () {
    if(!this.props.haveOAuthToken && location.search) {
      const code = verifyQString(location.search);
      if(code) requestOAuthToken(code).then((tokens) => {
        if(!tokens['error']) {
          storeTokens(tokens)
          setTimeout(
            () => refreshOAuthToken().then(storeTokens),
            tokens['expires_in'] * 1000
          )
          this.props.dispatch({type: "FETCHED_TOKEN"})
        } else {
          throw new Error(tokens['error'])
        }
      }).catch(e => this.props.dispatch({type: "FETCH_TOKEN_FAILED"}));
    }
  }
  render () {
    const { bySubreddit, foundPosts, mainPosts, haveOAuthToken, postParams } = this.props
    let showBy, posts, fetchPostsCB, srDisplay, scrollableMain

    if(bySubreddit.shown) showBy = 'sr';
    else if(foundPosts.all.length || foundPosts.isLoading) showBy = 'search';
    else showBy = 'all';

    if(showBy == 'sr') {
      srDisplay = <SubredditsIndex dispatch={this.props.dispatch}
        srsWithPosts={bySubreddit.srsWithPosts} />;
    } else {
      posts = (showBy == 'search') ? foundPosts : mainPosts;
      scrollableMain = <InfiniteMain posts={posts} showBy={showBy} searchParams={postParams}
        dispatch={this.props.dispatch.bind(this)} loggedIn={haveOAuthToken} />;
    }

    return (
      <div className="main">
        <header>
          <NavBar />
          <SubscriptionsMenu />
        </header>
        <ErrorDisplay />
        {showBy == 'sr' ? srDisplay : scrollableMain}
      </div>
    )
  }
}
