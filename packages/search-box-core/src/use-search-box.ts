import { useRef } from 'react'
import { SearchBoxInstance } from './interface'
import { SearchBoxStore } from './store'

export function useSearchBox (searchBox?: SearchBoxInstance): [SearchBoxInstance] {
  const searchBoxRef = useRef<SearchBoxInstance>()
  const searchBoxStore = new SearchBoxStore()

  if (!searchBoxRef.current) {
    if (searchBox) {
      searchBoxRef.current = searchBox
    } else {
      searchBoxRef.current = searchBoxStore
    }
  }

  return [searchBoxRef.current]
}
