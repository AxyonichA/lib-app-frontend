const extractInfoFromCookies = (info) => {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === info) {
      return value;
    }
  }
  return null
}
function clearAllCookies() {
  document.cookie = 'token=; max-age=-1'
}
export { extractInfoFromCookies, clearAllCookies }