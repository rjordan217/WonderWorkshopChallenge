import React from 'react'
import { connect } from 'react-redux'

@connect((store)=>{
  return {
    errors: store.errors
  }
})
export default class ErrorDisplay extends React.Component {
  render () {
    if(this.props.errors.length) {
      setTimeout(() => this.props.dispatch({type: "CLEAR_ERRORS"}), 2000)
      return (
        <div className="disp-errs">{this.props.errors.map((err,idx) => {
            return <span key={idx}>{err}</span>
          })}</div>
        );
    } else return null;
  }
}
