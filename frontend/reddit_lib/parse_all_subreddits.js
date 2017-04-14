import extractSubreddit from './extract_subreddit'

export default function (srsJSON) {
  return srsJSON.data.children.map(unparsedSR => extractSubreddit(unparsedSR));
}
