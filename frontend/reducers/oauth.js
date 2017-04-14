export default function(store = false, action) {
  switch (action.type) {
    case "LOGOUT_USER":
      store = false;
      break;
    case "FETCHED_TOKEN":
      store = true;
      break;
    case "FETCH_TOKEN_FAILED":
      store = false;
      break;
  }
  return store;
}
