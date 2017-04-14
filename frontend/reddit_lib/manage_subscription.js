import oauthRequest from './oauth_request'
import urlEncodeObject from './url_encode_object'

export default function (action,sr_name) {
  let opts = {sr_name, action}
  if(action == 'sub') opts['skip_initial_defaults'] = true;
  return oauthRequest(
    '/api/subscribe',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlEncodeObject(opts)
    }
  );
}
