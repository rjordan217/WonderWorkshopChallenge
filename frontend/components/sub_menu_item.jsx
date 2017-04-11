import React from 'react'
import manageSubscription from '../reddit_lib/manage_subscription'

export default class SubMenuItem extends React.Component {
  _toggleSubscription () {
    const { name, amSubscribed } = this.props.subreddit,
        action = amSubscribed ? 'unsub' : 'sub';
    this.props.dispatch(manageSubscription(action,name))
  }
  render () {
    const { name, amSubscribed, isShowing }  = this.props.subreddit,
        subscribe = amSubscribed ? "☒" : "+",
        display = isShowing ? "<" : ">";

    return (
      <div className="sr-menu-item">
        <span className="sr-item-name">{name}</span>
        <button className="sr-subscribe" onClick={this._toggleSubscription}
          >{subscribe}</button>
        <button className="sr-show">{display}</button>
      </div>
    );
  }
}
