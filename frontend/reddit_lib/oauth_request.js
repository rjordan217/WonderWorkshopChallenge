import { OAUTH_URI } from '../constants'

export default function (relPath, otherOptions) {
  const token = localStorage.getItem('access_token')
  if(!token)
    throw new Error("Must authorize application to manage credentials.");
  else
    return fetch(
      OAUTH_URI + relPath,
      {...otherOptions, headers: new Headers({'Authorization': "bearer " + token})}
    ).then(res => {
      return res.json()
    });
}
