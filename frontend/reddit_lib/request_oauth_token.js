import { ACCESS_TOKEN_URI, REDIRECT_URI, CLIENT_ID } from '../constants'
import urlEncodeObject from './url_encode_object'

export default function (code) {
  const reqParams = {
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': REDIRECT_URI
  }
  console.log(JSON.stringify(reqParams));
  return fetch(
    ACCESS_TOKEN_URI,
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
