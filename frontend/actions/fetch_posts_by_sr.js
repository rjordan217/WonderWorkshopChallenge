import oauthRequest from '../reddit_lib/oauth_request'
import parseAllPosts from '../reddit_lib/parse_all_posts'
import urlEncodeObject from '../reddit_lib/url_encode_object'

export default function(sr,filter, after = "") {
  if(after) after = '?' + urlEncodeObject({ after });
  const path = sr.name + filter + after;
  return dispatch => {
    oauthRequest(path).then((postsJSON) => {
      let payload = parseAllPosts(postsJSON)
      payload.name = sr.name
      dispatch({type: "FETCHED_SR_POSTS", payload})
    }).catch(e => {
      dispatch({type: "DISPLAY_ERROR", payload: e.message})
      throw e
    })
  }
}
