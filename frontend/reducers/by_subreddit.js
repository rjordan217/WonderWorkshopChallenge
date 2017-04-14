export default function(store = {shown: false, srsWithPosts: []}, action) {
  switch (action.type) {
    case "DISPLAY_BY_SUBREDDIT":
      store = {...store, shown: true};
      break;
    case "SHOW_SUBREDDIT":
      action.payload.isShowing = true;
      let sr = {...action.payload, posts: [], isLoading: true}
      store = {...store, srsWithPosts: srsWithPosts.unshift(sr)};
      break;
    case "DELETE_ALL_POSTS":
      store = {...store, srsWithPosts: []};
      break;
    case "SHOW_MAIN":
      store = {...store, shown: false};
      break;
    case "FETCHED_SR_POSTS":
      let toEdit = store.srsWithPosts.find(sr => sr.name == action.payload.srName)
      toEdit.isLoading = false;
      toEdit.posts = toEdit.posts.concat(action.payload.posts);
      break;
  }
  return store
}
