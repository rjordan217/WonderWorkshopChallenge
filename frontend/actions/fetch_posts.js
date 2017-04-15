import parseAll from '../reddit_lib/parse_all_posts'

export default function(after = "") {
  const addedParams = after ? "&after=t3_" + after : "";
  return dispatch => {
    return fetch('https://www.reddit.com/r/all.json?limit=30' + addedParams)
      .then(res => {return res.json()})
      .then(json => {
        dispatch({
          type: "ADD_POSTS",
          payload: parseAll(json)
        })
      })
  };
}
