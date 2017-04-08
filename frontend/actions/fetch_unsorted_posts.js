import parseAll from '../reddit_lib/parse_all'

export default function() {
  return dispatch => {
    return fetch('./test/practice_all.json')
      .then(res => {return res.json()})
      .then(json => {
        dispatch({
          type: "ADD_POSTS",
          payload: parseAll(json)
        })
      })
  };
}
