import React, { PropTypes } from 'react'
import { store } from '../store'
import { connect } from 'react-redux'
import NavBar from './nav_bar'
import PostsIndex from './posts_index'
import SubscriptionsMenu from './subscriptions_menu'

export default class Main extends React.Component {
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
