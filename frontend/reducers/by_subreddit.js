export default function(store = {shown: false, srsWithPosts: []}, action) {
  let srsWithPosts, idx, toEdit;
  switch (action.type) {
    case "DISPLAY_BY_SUBREDDIT":
      store = {...store, shown: true};
      break;
    case "SHOW_SUBREDDIT":
      let sr = {...action.payload, all: [], isLoading: true};
      store = {...store, srsWithPosts: store.srsWithPosts.concat(sr)};
      break;
    case "HIDE_SUBREDDIT":
      store = {...store, srsWithPosts: store.srsWithPosts
        .filter(sr => sr.name !== action.payload.name)};
      store.shown = !!store.srsWithPosts.length
      break;
    case "UNSUBSCRIBE":
      store = {...store}
      toEdit = store.srsWithPosts.find(sr => sr.name == action.payload)
      toEdit.amSubscribed = false;
      break;
    case "SUBSCRIBE":
      store = {...store}
      toEdit = store.srsWithPosts.find(sr => sr.name == action.payload)
      toEdit.amSubscribed = true;
      break;
    case "DELETE_ALL_POSTS":
      store = {...store, srsWithPosts: []};
      break;
    case "SHOW_MAIN":
      store = {shown: false, srsWithPosts: []};
      break;
    case "CHANGE_SR_FILTER":
      idx = store.srsWithPosts.findIndex(sr => sr.name == action.payload.name);
      toEdit = {...store.srsWithPosts[idx], isLoading: true};
      toEdit.all = []
      srsWithPosts = store.srsWithPosts.slice();
      srsWithPosts.splice(idx,1,toEdit);
      store = {...store, srsWithPosts}
      break;
    case "FETCHING_SR_POSTS":
      idx = store.srsWithPosts.findIndex(sr => sr.name == action.payload.name);
      toEdit = {...store.srsWithPosts[idx], isLoading: true};
      srsWithPosts = store.srsWithPosts.slice();
      srsWithPosts.splice(idx,1,toEdit);
      store = {...store, srsWithPosts}
      break;
    case "FETCHED_SR_POSTS":
      idx = store.srsWithPosts.findIndex(sr => sr.name == action.payload.name);
      toEdit = {...store.srsWithPosts[idx], isLoading: false};
      toEdit['all'] = toEdit.all.concat(action.payload)
      srsWithPosts = store.srsWithPosts.slice();
      srsWithPosts.splice(idx,1,toEdit);
      store = {...store, srsWithPosts}
      break;
  }
  return store
}
