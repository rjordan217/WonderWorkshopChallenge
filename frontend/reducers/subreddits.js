export default function(store = { isLoading: false, all: [] }, action) {
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
      toUpdate.amSubscribed = true;
      break;
    case "LOGOUT_USER":
      store = { isLoading: false, all: [] }
      break;
  }
  return store
}
