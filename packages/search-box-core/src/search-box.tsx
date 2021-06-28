import React, { useCallback, useMemo } from 'react'
import { toJS } from 'mobx'

import { SearchBoxContext } from './context'
import { useSearchBox } from './use-search-box'
import { Orange } from './orange'

// interface
import { SearchBoxInstance, SearchBoxParams } from './interface'
import { compose, useInitial } from './utils'
import { isFunction } from 'lodash-es'

export interface SearchBoxProps {
  searchBox?: SearchBoxInstance;
  children: React.ReactNode;
  onSearch?: (values: SearchBoxParams) => void;
  initialValues?: SearchBoxParams;
  name?: string;
  beforeFilter?: BeforeFilterParams | BeforeFilterParams[];
  wait?: number;
}

type BeforeFilterParams = (values: SearchBoxParams) => SearchBoxParams;

export const SearchBox: React.ForwardRefRenderFunction<
  SearchBoxInstance,
  SearchBoxProps
> = (props, ref) => {
  const {
    children,
    onSearch = () => { },
    searchBox,
    name = null,
    initialValues,
    beforeFilter
  } = props

  const locationStorage = useMemo(() => new Orange('location'), [])
  const [searchBoxInstance] = useSearchBox(searchBox)

  React.useImperativeHandle(ref, () => searchBoxInstance, [searchBoxInstance])

  const { getParams, setParams } = searchBoxInstance
  const handleSearch = useCallback(
    () => {
      setTimeout(() => {
        const params = toJS(getParams())

        if (name) {
          locationStorage.set(name, params)
        }
        if (isFunction(onSearch)) onSearch(params)
      }, 0)
    },
    [getParams, locationStorage, name, onSearch]
  )

  // Set initial value from location.search
  useInitial(() => {
    searchBoxInstance.on('search', handleSearch)
    const params = getParams()
    let _initialValues = initialValues ?? {}
    if (name) {
      const query = locationStorage.get(name)

      try {
        if (query) {
          _initialValues = query as any
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(`location.search[${name}]: invalid JSON string format.`)
      }

      if (beforeFilter) {
        let _parser = values => values

        if (isFunction(beforeFilter)) {
          _parser = compose(_parser, beforeFilter)
        } else if (Array.isArray(beforeFilter)) {
          _parser = compose(...beforeFilter)
        }
        _initialValues = _parser(_initialValues)
      }
    }
    setParams({ ..._initialValues, ...params })
    return () => {
      searchBoxInstance.off('search', handleSearch)
    }
  })

  return (
    <SearchBoxContext.Provider
      value={{
        searchBoxInstance,
        name
      }}
    >
      <div className="search-box">
        {children}
      </div>
    </SearchBoxContext.Provider>
  )
}
