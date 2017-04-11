export default function(obj) {
  let enc = encodeURIComponent
  return Object.keys(obj).map(key => enc(key) + '=' + enc(obj[key])).join('&')
}
