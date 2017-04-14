const defaultStore = {
  searchParams: {
    posts: {
      q: "Search posts...",
      sort: "relevance"
    },
    sr: {
      q: "Search subreddits...",
      sort: "relevance"
    }
  },
  posts: {isLoading: false, all: []},
  subreddits: {isLoading: false, all: []}
};

export default function(store = defaultStore, action) {
  switch (action.type) {
    case "POSTS_SEARCH_Q_UPDATED":
      store = {
        ...store,
        searchParams: {
          ...store.searchParams,
          posts: {...store.searchParams.posts, q: action.payload}
        }
      }
      break;
    case "SR_SEARCH_Q_UPDATED":
      store = {
        ...store,
        searchParams: {
          ...store.searchParams,
          sr: {...store.searchParams.sr, q: action.payload}
        }
      }
      break;
    case "POSTS_SEARCH_SORT_BY_UPDATED":
      store = {
        ...store,
        searchParams: {
          ...store.searchParams,
          posts: {...store.searchParams.posts, sort: action.payload}
        }
      }
      break;
    case "SR_SEARCH_SORT_BY_UPDATED":
      store = {
        ...store,
        searchParams: {
          ...store.searchParams,
          sr: {...store.searchParams.sr, sort: action.payload}
        }
      }
      break;
    case "FETCHING_SR_SEARCH":
      store = {...store, subreddits: {...store.subreddits, isLoading: true}}
      break;
    case "FETCHING_POSTS_SEARCH":
      store = {...store, posts: {...store.posts, isLoading: true}}
      break;
    case "FOUND_SUBREDDITS":
      store = {...store, subreddits: {isLoading: false, all: action.payload}}
      break;
    case "FOUND_LINKS":
      store = {...store, posts: {isLoading: false, all: action.payload}}
      break;
    case "CLEAR_FOUND_LINKS":
      store = {...store, posts: {...store.posts, all: []}}
      break;
    case "CLEAR_FOUND_SUBREDDITS":
      store = {...store, subreddits: {...store.subreddits, all: []}}
      break;
    case "LOGOUT_USER":
      store = defaultStore;
      break;
  }
  return store
}
