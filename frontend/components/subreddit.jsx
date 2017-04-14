import React from 'react'
import PostsIndex from './posts_index'

export default class Subreddit extends React.Component {
  render () {
    const { name, isLoading, title, header_img, amSubscribed, posts } = this.props.sr
    return (
      <div className="shown-by-sr">
        <span className="sr-name">{name}</span>
        <img className="sr-img" src={header_img} />
        <span className="sr-title">{title}</span>
        <PostsIndex posts={posts} showBy="sr" />
      </div>
    );
  }
}
