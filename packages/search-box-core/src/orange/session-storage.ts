export function set (key: string, value: string) {
  window.sessionStorage.setItem(key, value)
}
export function get (key: string) {
  return window.sessionStorage.getItem(key)
}
export function remove (key: string) {
  window.sessionStorage.removeItem(key)
}
export function clear () {
  window.sessionStorage.clear()
}
