import React from 'react'

export default class SubMenuItem extends React.Component {
  render () {
    const { name, amSubscribed, isShowing }  = this.props.subreddit,
        subscribe = amSubscribed ? "☒" : "+",
        display = isShowing ? "-" : ">";

    return (
      <div className="sr-menu-item">
        <span className="sr-item-name">{name}</span>
        <button className="sr-subscribe">{subscribe}</button>
        <button className="sr-show">{display}</button>
      </div>
    );
  }
}
