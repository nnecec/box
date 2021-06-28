export function set (key: string, value: string) {
  window.localStorage.setItem(key, value)
}
export function get (key: string) {
  return window.localStorage.getItem(key)
}
export function remove (key: string) {
  window.localStorage.removeItem(key)
}
export function clear () {
  window.localStorage.clear()
}
