export default function(store = {}, action) {
  switch (action.type) {
    case "USER_UPDATED":
      store = action.payload
      break;
    case "USER_NAME_UPDATED":
      store = {...store, name: action.payload}
      break;
  }
  return store
}
