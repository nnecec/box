import React from 'react'
import { useSearchBox } from './use-search-box'
import { SearchBoxStore } from './store'

import { SearchBox, SearchBoxProps } from './search-box'
import { Box } from './box'

const InternalSearchBox = React.forwardRef<SearchBoxStore, SearchBoxProps>(SearchBox) as (
  props: React.PropsWithChildren<SearchBoxProps>&{
    ref?: React.Ref<SearchBoxStore>;
  }
) => React.ReactElement

// eslint-disable-next-line no-redeclare
type InternalSearchBox=typeof InternalSearchBox;
interface RefSearchBox extends InternalSearchBox {
  Box: typeof Box;
  useSearchBox: typeof useSearchBox;
}

// eslint-disable-next-line no-redeclare
const RefSearchBox: RefSearchBox = InternalSearchBox as RefSearchBox

RefSearchBox.Box = Box
RefSearchBox.useSearchBox = useSearchBox

export { SearchBoxContext } from './context'
export { useSearchBox, Box }
export default RefSearchBox
export * from './interface'

export * as utils from './utils'
export { Orange } from './orange'
