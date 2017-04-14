import { REVOKE_TOKEN_URI, CLIENT_ID } from '../constants'
import urlEncodeObject from './url_encode_object'

export default function () {
  return dispatch => {
    const token = localStorage.getItem('refresh_token'),
    reqParams = {
      'token': token,
      'token_type_hint': 'refresh_token'
    };

    fetch(
      REVOKE_TOKEN_URI,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic '+ btoa(CLIENT_ID + ':'),
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body: urlEncodeObject(reqParams)
      }
    ).then(res => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('expiry_time')
      dispatch({type: "LOGOUT_USER"})
    })
  }
}
