export default function(store = [], action) {
  switch (action.type) {
    case "ADD_POSTS":
      store = store.concat(action.payload)
      break;
    case "ADD_POST":
      store = store.concat(action.payload)
      break;
    case "DELETE_POST":
      const findIdx = store.findIndex((post)=>{return post.id == action.payload})
      if(findIdx >= 0) store = store.splice(findIdx, 1);
      break;
    case "DELETE_ALL_POSTS":
      store = []
      break;
  }
  return store
}
