import errorsReducer from './reducers/errors'
import userReducer from './reducers/user'
import postsReducer from './reducers/posts'
import subredditsReducer from './reducers/subreddits'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  errors: errorsReducer,
  user: userReducer,
  posts: postsReducer,
  subreddits: subredditsReducer
})
// search: {
//   posts: [],
//   subreddits: []
// },
const initialState = {
  errors: [],
  user: { isLoading: false },
  posts: [],
  subreddits: []
}

const store = createStore(reducers, initialState, applyMiddleware(thunk));

store.subscribe(() => {
  console.log("store changed", store.getState());
})

export default store;
