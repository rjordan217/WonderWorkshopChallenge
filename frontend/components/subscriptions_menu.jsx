import React from 'react'
import fetchSubreddits from '../actions/fetch_subreddits'
import { connect } from 'react-redux'
import SubMenuItem from './sub_menu_item'

@connect((store) => {
  return {
    subreddits: store.subreddits
  }
})

export default class SubscriptionsMenu extends React.Component {
  componentWillMount () {
    this.props.dispatch(fetchSubreddits())
  }
  render () {
    const subMenuItems = this.props.subreddits.map((sub,idx) => {
      return <SubMenuItem subreddit={sub} key={idx} />
    })
    return (
      <section className="subscrips-menu">
        <input type="search" defaultValue="Search subreddits..."/>
        <div className="sr-menu-items">
          {subMenuItems}
        </div>
      </section>
    );
  }
}
