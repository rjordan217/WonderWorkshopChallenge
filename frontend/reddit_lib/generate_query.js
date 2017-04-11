export default function(queryData) {
  return Object.keys(queryData).map(
    k => encodeURIComponent(k) + '=' + encodeURIComponent(queryData[k])
  ).join('&');
}
