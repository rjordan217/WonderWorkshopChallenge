function getRandomLCChar() {
  return String.fromCharCode(Math.floor(Math.random() * 25) + 97);
}

export default function () {
  let stateStr = ""
  for (var i = 0; i < 12; i++) stateStr += getRandomLCChar();
  localStorage.setItem("stateToken", stateStr)
  return stateStr
}
