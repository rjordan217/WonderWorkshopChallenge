import React from 'react'
import updateSubscription from '../actions/update_subscription'

export default class SubMenuItem extends React.Component {
  _toggleSubscription () {
    const { name, amSubscribed } = this.props.subreddit,
        action = amSubscribed ? 'unsub' : 'sub';
    this.props.dispatch(updateSubscription(action,name))
  }
  render () {
    const { name, amSubscribed, isShowing }  = this.props.subreddit,
        subscribe = amSubscribed ? "☒" : "+",
        display = isShowing ? "<" : ">";

    return (
      <div className="sr-menu-item">
        <a className="sr-item-name">{name}</a>
        <button className="sr-subscribe"
          onClick={this._toggleSubscription.bind(this)}>{subscribe}</button>
        <button className="sr-show">{display}</button>
      </div>
    );
  }
}
