import userReducer from './reducers/user'
import postsReducer from './reducers/posts'
import subredditsReducer from './reducers/subreddits'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  user: userReducer,
  posts: postsReducer,
  subreddits: subredditsReducer
})

const initialState = {
  user: {},
  posts: [],
  subreddits: []
}

const store = createStore(reducers, initialState, applyMiddleware(thunk));

store.subscribe(() => {
  console.log("store changed", store.getState());
})

export default store;
