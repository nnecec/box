export function set (key: string, value: string) {
  const query = new URLSearchParams(location.search.slice(1))
  query.set(key, value)
  const url = `${location.pathname}?${query.toString()}`
  history.replaceState({ url }, '', url)
}
export function get (key: string) {
  const query = new URLSearchParams(location.search.slice(1))
  return query.get(key)
}
export function remove (key: string) {
  const query = new URLSearchParams(location.search.slice(1))
  query.delete(key)
  const url = `${location.pathname}?${query.toString()}`
  history.replaceState({ url }, '', url)
}
export function clear () {
  const url = `${location.pathname}`
  history.replaceState({ url }, '', url)
}
