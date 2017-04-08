import userReducer from './reducers/user'
import unsortedPostsReducer from './reducers/unsorted_posts'
import subredditsReducer from './reducers/subreddits'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  user: userReducer,
  unsortedPosts: unsortedPostsReducer,
  subreddits: subredditsReducer
})

const initialState = {
  user: {},
  unsortedPosts: [],
  subreddits: []
}

const store = createStore(reducers, initialState, applyMiddleware(thunk));

store.subscribe(() => {
  console.log("store changed", store.getState());
})

export default store;
