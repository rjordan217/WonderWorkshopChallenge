import { SEARCH_PATH } from '../constants'
import oauthRequest from '../reddit_lib/oauth_request'
import urlEncodeObject from '../reddit_lib/url_encode_object'
import parseAllSubreddits from '../reddit_lib/parse_all_subreddits'
import parseAllPosts from '../reddit_lib/parse_all_posts'

export default function(searchParams,searchType) {
  const opts = {...searchParams}

  let searchPath, actionType, parser;
  if(searchType == 'sr') {
    opts.type = 'sr'
    searchPath = SEARCH_PATH + '?' + urlEncodeObject(opts)
    actionType = "FOUND_SUBREDDITS"
    parser = parseAllSubreddits
  } else {
    opts.type = 'link'
    searchPath = SEARCH_PATH + '?' + urlEncodeObject(opts)
    actionType = "FOUND_LINKS"
    parser = parseAllPosts
  }

  return dispatch => {
    if(searchType == 'posts') dispatch({type: "DELETE_ALL_POSTS"});
    dispatch({type: "CLEAR_" + actionType})
    oauthRequest(searchPath, opts).then((foundJSON) => {
      dispatch({type: actionType, payload: parser(foundJSON)})
    }).catch(e => dispatch({type: "DISPLAY_ERROR", payload: e.message}))
  }
}
