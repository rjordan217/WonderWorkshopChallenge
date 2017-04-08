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
    if(name) return (
      <nav>
        <div className="user-name">Welcome, {name}!</div>
      </nav>
    );
    let loginClicked = ()=>{this.props.dispatch({type: "USER_NAME_UPDATED", payload: "Jorge"})};
    return (
      <nav>
        <div className="log-reg">
          <button onClick={loginClicked}>Login</button>
          <button onClick={console.log}>Register</button>
        </div>
      </nav>
    )
  }
}
