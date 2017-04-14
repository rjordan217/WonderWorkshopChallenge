export default function(store = { isLoading: false, all: []}, action) {
  switch (action.type) {
    case "FETCHING_POSTS":
      store = {...store, isLoading: true}
      break;
    case "ADD_POSTS":
      store = {...store, all: store.all.concat(action.payload), isLoading: false}
      break;
    case "ADD_POST":
      store = {...store, all: store.all.concat(action.payload), isLoading: false}
      break;
    case "DELETE_POST":
      const findIdx = store.all.findIndex((post)=>{return post.id == action.payload})
      if(findIdx >= 0) store = {...store, all: store.all.splice(findIdx, 1)};
      break;
    case "DELETE_ALL_POSTS":
      store = {...store, all: []}
      break;
  }
  return store
}
