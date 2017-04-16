import bySubReducer from './reducers/by_subreddit'
import navColReducer from './reducers/nav_collapsed'
import sbColReducer from './reducers/sidebar_collapsed'
import oauthReducer from './reducers/oauth'
import errorsReducer from './reducers/errors'
import searchReducer from './reducers/search'
import userReducer from './reducers/user'
import postsReducer from './reducers/posts'
import subredditsReducer from './reducers/subreddits'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import tokenUpToDate from './reddit_lib/token_up_to_date'

const reducers = combineReducers({
  bySubreddit: bySubReducer,
  navCollapsed: navColReducer,
  sidebarCollapsed: sbColReducer,
  haveOAuthToken: oauthReducer,
  errors: errorsReducer,
  search: searchReducer,
  user: userReducer,
  posts: postsReducer,
  subreddits: subredditsReducer
})

// Ensures uniformity of index objects passed
const defaultIndexObj = {isLoading: false, all: []}

const initialState = {
  bySubreddit: {
    shown: false,
    srsWithPosts: []
  },
  navCollapsed: false,
  sidebarCollapsed: false,
  haveOAuthToken: !!localStorage.getItem('access_token') && tokenUpToDate(),
  errors: [],
  search: {
    isLoading: false,
    searchParams: {
      posts: {
        q: "",
        sort: "relevance"
      },
      sr: {
        q: "",
        sort: "relevance"
      }
    },
    posts: {...defaultIndexObj},
    subreddits: {...defaultIndexObj}
  },
  user: { isLoading: false },
  posts: {...defaultIndexObj},
  subreddits: {...defaultIndexObj}
}

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
