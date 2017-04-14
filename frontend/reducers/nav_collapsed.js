export default function(store = false, action) {
  switch (action.type) {
    case "COLLAPSE_NAV":
      return true;
    case "SHOW_NAV":
      return false;
  }
  return store
}
