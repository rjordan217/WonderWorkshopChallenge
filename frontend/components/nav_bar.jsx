import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import SearchBar from './search_bar'
import generateQuery from '../reddit_lib/generate_query'
import { CLIENT_ID,REDIRECT_URI,APP_SCOPE } from '../constants'
import setStateToken from '../reddit_lib/set_state_token'
import tokenUpToDate from '../reddit_lib/token_up_to_date'
import fetchUser from '../actions/fetch_user'

@connect((store)=>{
  return {
    user: store.user
  }
})
export default class NavBar extends React.Component {
  componentWillMount() {
    if(!this.props.user.name && tokenUpToDate()) {
      this.props.dispatch({type: 'FETCHING_USER'})
      this.props.dispatch(fetchUser())
    }
  }
  _setLoginURI () {
    let queryData = {
      "client_id"    : CLIENT_ID,
      "response_type": "code",
      "state"        : setStateToken(),
      "redirect_uri" : REDIRECT_URI,
      "duration"     : "permanent",
      "scope"        : APP_SCOPE
    };
    const queryString = generateQuery(queryData);
    location.href = "https://www.reddit.com/api/v1/authorize?" + queryString;
  }
  render () {
    const { name, isLoading } = this.props.user
    let userNav;
    if(name)
      userNav = <div className="user-name">Welcome, {name}!</div>;
    else if(isLoading)
      userNav = <img src="./res/ellipsis.gif" />;
    else
      userNav = (
        <button onClick={this._setLoginURI.bind(this)}
          className="login">
          Log In
        </button>
      );

    return (
      <nav>
        <div className="logo">
          <img src="https://cdn.worldvectorlogo.com/logos/reddit-2.svg" />
          <span>Reddit</span>
        </div>
        <SearchBar defVal="Search posts..." />
        {userNav}
      </nav>
    )
  }
}
