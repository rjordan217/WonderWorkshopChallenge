import React from 'react'

function trimTitle(txt) {
  const MAX_CHAR_COUNT = 75
  let splitTxt = txt.split(' '),
      idx = 0,
      trimmed = splitTxt[idx++];
  while(idx < splitTxt.length &&
    (trimmed.length + splitTxt[idx].length) < MAX_CHAR_COUNT) {
    trimmed += " " + splitTxt[idx++]
  }
  if(trimmed.length > MAX_CHAR_COUNT || idx < splitTxt.length)
    trimmed = trimmed + "...";
  return trimmed;
}

export default class Post extends React.Component {
  render () {
    const {
      id, score, author, subreddit, thumbnail, url, title, num_comments
    } = this.props.post;
    let processedThumbnail = thumbnail.match(/https?:\/\/*/i) ?
      thumbnail : 'https://cdn.worldvectorlogo.com/logos/reddit-2.svg';
    return (
      <div className="post group">
        <a href={url} target="_blank">
          <img src={processedThumbnail} />
        </a>
        <div className="post-text">
          <span className="title">
            <a href={url} target="_blank"
              dangerouslySetInnerHTML={{__html: trimTitle(title)}}></a>
          </span>
          <span className="author">
            {"posted by "}
            <a href={"https://www.reddit.com/user/" + author}
              target="_blank">{author}</a>
            {" to "}
            <a href={"https://www.reddit.com/r/" + subreddit}
              target="_blank">{"/r/" + subreddit}</a>
          </span>
        </div>
      </div>
    );
  }
}
