import { ALL_MY_SUBSCRIPS } from '../constants'
import oauthRequest from '../reddit_lib/oauth_request'
import parseAllSubreddits from '../reddit_lib/parse_all_subreddits'
import urlEncodeObject from '../reddit_lib/url_encode_object'

export default function(after = null) {
  let opts = {}

  if(after) opts.query = urlEncodeObject({ after });
  return dispatch => {
    oauthRequest(ALL_MY_SUBSCRIPS, opts).then((subredditsJSON) => {
      dispatch({type: "ADD_SUBREDDITS", payload: parseAllSubreddits(subredditsJSON)})
    }).catch(e => dispatch({type: "DISPLAY_ERROR", payload: e.message}))
  }
}
