import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

@connect((store)=>{
  return {
    user: store.user
  }
})
export default class NavBar extends React.Component {
  render () {
    const { name } = this.props.user
    let userNav;
    if(name) {
      userNav = <div className="user-name">Welcome, {name}!</div>;
    } else {
      let loginClicked = ()=>{this.props.dispatch({type: "USER_NAME_UPDATED", payload: "Jorge"})};
      userNav = (
        <div className="log-reg">
          <button onClick={loginClicked}>Login</button>
          <button onClick={console.log}>Register</button>
        </div>
      );
    }

    return (
      <nav>
        <div className="logo">
          <img src="https://cdn.worldvectorlogo.com/logos/reddit-2.svg" />
          <span>Reddit</span>
        </div>
        <div className="search-bar">
          <input type="search" defaultValue="Search Reddit..." />
        </div>
        {userNav}
      </nav>
    )
  }
}
