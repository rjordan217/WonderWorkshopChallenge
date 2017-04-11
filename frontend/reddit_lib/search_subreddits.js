import oauthRequest from './oauth_request'
import { SEARCH_SUBS } from '../constants'

export default function (prefix) {
  return oauthRequest(
    SEARCH_SUBS,
    {
      method: 'POST',
      body: JSON.stringify({
        'exact'                 : true,
        'include_over_18'       : false,
        'include_unadvertisable': true,
        'query'                 : prefix
      })
    }
  )
}
