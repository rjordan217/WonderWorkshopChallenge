import { OAUTH_URI } from '../constants'

export default function (relPath, otherOptions) {
  let otherHeaders = (otherOptions && otherOptions['headers']) ?
    {...otherOptions['headers']} : {};

  let fullPath = OAUTH_URI + relPath;
  if(otherOptions && otherOptions.query) {
    fullPath += "?" + otherOptions.query;
    delete otherOptions.query
  }

  const token = localStorage.getItem('access_token')
  if(!token)
    throw new Error("Must authorize application to manage credentials.");
  else
    return fetch(
      fullPath,
      {...otherOptions, headers: new Headers({
        ...otherHeaders,
        'Authorization': "bearer " + token
      })}
    ).then(res => {
      if(res.ok) return res.json();
      else {
        let errMessage;
        if(res.status >= 500)
          errMessage = "Sorry, Reddit's servers are having some trouble! Status: " + res.status;
        else errMessage = "Error: " + res.status + ' ' + res.statusText;
        throw new Error(errMessage)
      }
    }).catch(e => {
      console.log(e);
      throw e
    });
}
