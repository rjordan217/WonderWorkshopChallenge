export default function(store = false, action) {
  switch (action.type) {
    case "COLLAPSE_SIDEBAR":
      return true;
    case "SHOW_SIDEBAR":
      return false;
  }
  return store
}
