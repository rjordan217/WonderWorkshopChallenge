export default function(store = {}, action) {
  switch (action.type) {
    case "USER_UPDATED":
      store = {...action.payload, isLoading: false}
      break;
    case "FETCHING_USER":
      store = {...store, isLoading: true}
      break;
    case "LOGOUT_USER":
      store = {}
      break;
  }
  return store
}
