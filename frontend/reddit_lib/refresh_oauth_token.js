import { REFRESH_TOKEN_URI, CLIENT_ID } from '../constants'
import urlEncodeObject from './url_encode_object'

export default function (code) {
  const reqParams = {
    'grant_type': 'refresh_token',
    'refresh_token': localStorage.getItem('refresh_token')
  }
  return fetch(
    REFRESH_TOKEN_URI,
    {
      method: 'POST',
      headers: {
        'Authorization': 'Basic '+ btoa(CLIENT_ID + ':'),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      body: urlEncodeObject(reqParams)
    }
  ).then(res => res.json())
}
