export default function(store = { isLoading: false, all: [] }, action) {
  let idx,all;
  switch (action.type) {
    case "FETCHING_SUBREDDITS":
      store = {...store, isLoading: true}
      break;
    case "ADD_SUBREDDITS":
      store = {...store, isLoading: false, all: store.all.concat(action.payload)}
      break;
    case "ADD_SUBREDDIT":
      store = {...store, isLoading: false, all: [action.payload].concat(store.all)}
      break;
    case "UNSUBSCRIBE":
      store = {...store, all: store.all.filter((sr) => sr.name !== action.payload)}
      break;
    case "SUBSCRIBE":
      store = {...store}
      let toUpdate = store.all.find(sr => sr.name == action.payload)
      if(toUpdate) toUpdate.amSubscribed = true;
      break;
    case "SHOW_SUBREDDIT":
      idx = store.all.findIndex(sr => sr.name == action.payload.name),
      all = store.all.slice();
      all[idx] = {...all[idx], isShowing: true}
      store = {...store, all}
      break;
    case "HIDE_SUBREDDIT":
      idx = store.all.findIndex(sr => sr.name == action.payload.name),
      all = store.all.slice();
      all[idx] = {...all[idx], isShowing: false}
      store = {...store, all}
      break;
    case "SHOW_MAIN":
      store = {...store, all: store.all.map((sr) => {
        return {...sr, isShowing: false}
      })}
      break;
    case "LOGOUT_USER":
      store = { isLoading: false, all: [] }
      break;
  }
  return store
}
