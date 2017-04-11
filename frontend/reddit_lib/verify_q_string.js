export default function verifyQString(str) {
  const keyValStr = str.substring(1),
        kvPairs = {};

  keyValStr.split('&').forEach((keyVal) => {
    let pair = keyVal.split('=')
    kvPairs[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  });

  if(kvPairs.error) {
    alert("Error connecting Reddit: " + kvPairs.error);
    return;
  }

  const stateToken = localStorage.getItem("stateToken");
  if(!stateToken == kvPairs.token) {
    alert("Incorrect state token.");
    return;
  }

  return kvPairs.code
}
