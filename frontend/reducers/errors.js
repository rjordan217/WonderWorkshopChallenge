export default function(store = [], action) {
  switch (action.type) {
    case "DISPLAY_ERROR":
      store = store.concat(action.payload)
      break;
  }
  return store
}
