import { USER_PATH } from '../constants'
import oauthRequest from '../reddit_lib/oauth_request'
import parseUser from '../reddit_lib/parse_user'

export default function() {
  return dispatch => {
    oauthRequest(USER_PATH).then((userJSON) => {
      console.log(userJSON);
      dispatch({type: "USER_UPDATED", payload: parseUser(userJSON)})
    }).catch(e => dispatch({type: "DISPLAY_ERROR", payload: e.message}))
  }
}
