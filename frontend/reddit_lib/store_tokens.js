export default function(tokensJSON) {
  localStorage.setItem('access_token', tokensJSON['access_token'])
  if(!localStorage.getItem('refresh_token'))
    localStorage.setItem('refresh_token', tokensJSON['refresh_token'])

  const date = new Date()
  localStorage.setItem('expiry_time', tokensJSON['expires_in'] * 1000 + date.getTime());
}
