import React from 'react'
import PostsIndex from './posts_index'
import fetchPostsBySR from '../actions/fetch_posts_by_sr'

export default class Subreddit extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPostsBySR(this.props.sr))
  }
  render () {
    const { name, isLoading, title, header_img, amSubscribed, all, filter } = this.props.sr
    let posts = {all, isLoading}
    return (
      <div className="sr-item">
        <button className="sr-sbscrb"></button>
        <button className="sr-min">-</button>
        <div className="sr-sort-by">
          Sort by:
          <input type="radio" value={}
        </div>
        <div className="sr-dets group">
          <div className="sr-img-container"><img className="sr-img" src={header_img} /></div>
          <h2 className="sr-name">{name}</h2>
        </div>
        <div className="sr-posts-container"><PostsIndex posts={posts} showBy="sr" /></div>
      </div>
    );
  }
}
