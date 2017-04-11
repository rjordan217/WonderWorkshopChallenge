import oauthRequest from './oauth_request'

export default function (action,sr_name) {
  let opts = {action, sr_name}
  if(action == 'sub') opts['skip_initial_defaults'] = true;
  return oauthRequest(
    '/api/subscribe',
    {
      method: 'POST',
      body: JSON.stringify(opts)
    }
  );
}
