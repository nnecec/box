import { createContext } from 'react'
import { SearchBoxInstance } from './interface'
import { SearchBoxStore } from './store'

export const SearchBoxContext = createContext<SearchBoxContextProps>({
  searchBoxInstance: new SearchBoxStore(),
  name: null
})

export interface SearchBoxContextProps extends SearchBoxProviderProps {
  searchBoxInstance: SearchBoxInstance
  name: string|null
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchBoxProviderProps { }
