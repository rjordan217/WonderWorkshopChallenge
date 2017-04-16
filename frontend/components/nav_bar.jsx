import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import SearchBar from './search_bar'
import generateQuery from '../reddit_lib/generate_query'
import { CLIENT_ID,REDIRECT_URI,APP_SCOPE } from '../constants'
import setStateToken from '../reddit_lib/set_state_token'
import tokenUpToDate from '../reddit_lib/token_up_to_date'
import logout from '../reddit_lib/logout'
import fetchUser from '../actions/fetch_user'
import fetchPosts from '../actions/fetch_posts'

@connect((store)=>{
  return {
    collapsed: store.navCollapsed,
    haveOAuthToken: store.haveOAuthToken,
    user: store.user
  }
})
export default class NavBar extends React.Component {
  componentWillMount() {
    if(this.props.haveOAuthToken) {
      this.props.dispatch({type: 'FETCHING_USER'})
      this.props.dispatch(fetchUser())
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if(nextProps.haveOAuthToken && !this.props.haveOAuthToken) {
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
  _getMainPosts() {
    this.props.dispatch({type: "CLEAR_FOUND_LINKS"})
    this.props.dispatch({type: "DELETE_ALL_POSTS"})
    this.props.dispatch({type: "SHOW_MAIN"})
    this.props.dispatch({type: "FETCHING_POSTS"})
    this.props.dispatch(fetchPosts())
  }
  _logout() {
    this.props.dispatch(logout())
  }
  _toggleShow () {
    this.props.dispatch({type: (this.props.collapsed ? "SHOW" : "COLLAPSE") + "_NAV"})
  }
  render () {
    const { name, isLoading } = this.props.user
    let userNav;
    if(name)
      userNav = (
        <div className="user-name">
          <span>Welcome, {name}!</span>
          <img src="./res/logout.png" onClick={this._logout.bind(this)} title="Logout"/>
        </div>
      );
    else if(isLoading)
      userNav = <img src="./res/ellipsis.gif" className="loading-img" />;
    else
      userNav = (
        <button onClick={this._setLoginURI.bind(this)}
          className="login">
          Log In
        </button>
      );

    let klasses = "", collapser;
    if(window.isMobile) {
      collapser = <button onClick={this._toggleShow.bind(this)} className="nav-clps">
        {this.props.collapsed ? '↓' : '↑'}
      </button>;
      if(this.props.collapsed) klasses = "collapsed";
    } else collapser = null;

    return (
      <nav className={klasses}>
        <div className="logo" onClick={this._getMainPosts.bind(this)}>
          <img src="./res/default_reddit.svg" />
          <span>RedditReactive</span>
        </div>
        <SearchBar defVal="Search posts..." searchType="posts" />
        {userNav}
        {collapser}
      </nav>
    )
  }
}
