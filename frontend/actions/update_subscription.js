import manageSubscription from '../reddit_lib/manage_subscription'

export default function(action, sr) {
  return dispatch => {
    manageSubscription(action,sr)
    .then(json => dispatch({type: action.toUpperCase() + "SCRIBE",payload: sr}))
    .catch(e => console.log(e.message))
  }
}
