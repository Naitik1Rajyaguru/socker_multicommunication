export function setUser(key, userName) {
  sessionStorage.setItem(key, userName);
}

export function getUser(key) {
  return sessionStorage.getItem(key);
}
