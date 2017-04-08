import React from 'react'

export default class Post extends React.Component {
  render () {
    const {
      id, score, author, subreddit, thumbnail, url, title, num_comments
    } = this.props.post;
    let processedThumbnail = thumbnail.match(/https?:\/\/*/i) ?
      thumbnail : 'https://cdn.worldvectorlogo.com/logos/reddit-2.svg';
    return (
      <div className="post">
        <a href={url} target="_blank">
          <img src={processedThumbnail} />
          <span className="title">{title}</span>
          <span className="author"> posted by {author}</span>
        </a>
      </div>
    );
  }
}
