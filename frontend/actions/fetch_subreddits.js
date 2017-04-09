export default function() {
  return dispatch => {
    return dispatch({type: "ADD_SUBREDDITS", payload: [
      {name: 'sr1', amSubscribed: true, isShowing: false},
      {name: 'funny', amSubscribed: false, isShowing: true},
      {name: 'funny', amSubscribed: false, isShowing: true},
      {name: 'funny', amSubscribed: false, isShowing: true},
      {name: 'funny', amSubscribed: false, isShowing: true},
      {name: 'funny', amSubscribed: false, isShowing: true}
    ]})
  }
}
