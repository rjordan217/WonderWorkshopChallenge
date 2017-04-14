import React from 'react'
import fetchSubreddits from '../actions/fetch_subreddits'
import { connect } from 'react-redux'
import SubMenuItem from './sub_menu_item'
import SearchBar from './search_bar'
import SearchResults from './search_results'

@connect((store) => {
  return {
    collapsed: store.sidebarCollapsed,
    loggedIn: store.haveOAuthToken,
    subreddits: store.subreddits
  }
})

export default class SubscriptionsMenu extends React.Component {
  componentWillMount () {
    if(this.props.loggedIn) {
      this.props.dispatch({type: 'FETCHING_SUBREDDITS'});
      this.props.dispatch(fetchSubreddits());
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if(nextProps.loggedIn && !this.props.loggedIn) {
      this.props.dispatch({type: 'FETCHING_SUBREDDITS'});
      this.props.dispatch(fetchSubreddits());
    }
  }
  _scrollListener (e) {
    let srMenu = e.target
    if(srMenu.scrollHeight - srMenu.scrollTop == srMenu.clientHeight && this.props.loggedIn) {
      const srs = this.props.subreddits.all,
          after = 't5_' + srs[srs.length - 1].id;
      this.props.dispatch({type: 'FETCHING_SUBREDDITS'});
      this.props.dispatch(fetchSubreddits(after));
    }
  }
  _toggleShow () {
    this.props.dispatch({type: (this.props.collapsed ? "SHOW" : "COLLAPSE") + "_SIDEBAR"})
  }
  render () {
    const { all, isLoading } = this.props.subreddits
    const subMenuItems = all.map((sub,idx) => {
      return <SubMenuItem subreddit={sub} key={idx} dispatch={this.props.dispatch} />
    })
    const loading = isLoading ?
      <img src="./res/ellipsis.gif" className="loading-img" /> : <div className="loading-img"></div>;
    const notLoggedIn = this.props.loggedIn ? null :
      <span>{"Log in to search/manage subscriptions."}</span>;

    let klasses = "subscrips-menu",
        collapser;
    if(window.isMobile) {
      collapser = <button onClick={this._toggleShow.bind(this)} className="sb-clps">
        {this.props.collapsed ? '→' : '←'}
      </button>;
      if(this.props.collapsed) klasses += " collapsed";
    } else collapser = null;

    return (
      <section className={klasses}>
        <SearchBar defVal="Search subreddits..." searchType="sr" />
        <SearchResults />
        <div className="sr-menu-items" onScroll={this._scrollListener.bind(this)}>
          {notLoggedIn}
          {subMenuItems}
          {loading}
        </div>
        {collapser}
      </section>
    );
  }
}
