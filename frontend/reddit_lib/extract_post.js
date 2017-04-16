export default function (json) {
  let {
    id, score, author, subreddit, thumbnail, url, title, num_comments, permalink
  } = json.data
  return {id,score,author,subreddit,thumbnail,url,title,num_comments,permalink}
}
