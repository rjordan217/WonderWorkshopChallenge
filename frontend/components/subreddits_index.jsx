import React from 'react'
import Subreddit from './subreddit'

export default class SubredditsIndex extends React.Component {
  render () {
    return (
      <section className="srs-index">{this.props.srsWithPosts.map((srWPosts,idx)=>{
          return <Subreddit sr={srWPosts} key={idx} />
        })}</section>
    );
  }
}
