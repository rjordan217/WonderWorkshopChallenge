import React, { PropTypes } from 'react'
import { store } from '../store'
import { connect } from 'react-redux'
import NavBar from './nav_bar'
import PostsIndex from './posts_index'
import SubscriptionsMenu from './subscriptions_menu'
import requestOAuthToken from '../reddit_lib/request_oauth_token'
import refreshOAuthToken from '../reddit_lib/refresh_oauth_token'
import verifyQString from '../reddit_lib/verify_q_string'
import storeTokens from '../reddit_lib/store_tokens'

export default class Main extends React.Component {
  componentDidMount () {
    if(location.search) {
      const code = verifyQString(location.search);
      if(code) requestOAuthToken(code).then((tokens) => {
        storeTokens(tokens)
        setTimeout(
          () => refreshOAuthToken().then(storeTokens),
          tokens['expires_in'] * 1000
        )
      });
    }
  }
  render () {
    return (
      <div className="main">
        <header>
          <NavBar />
          <SubscriptionsMenu />
        </header>
        <main>
          <PostsIndex />
        </main>
      </div>
    )
  }
}
