export default function() {
  const time = new Date()
  return time.getTime() < localStorage.getItem('expiry_time')
}
