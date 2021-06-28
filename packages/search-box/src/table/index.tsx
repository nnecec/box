import React, { useContext, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { SearchBoxContext } from '@nnecec/search-box-core'

import { TableProps } from './interface'
import { Toolbar } from './toolbar'
import { InternalTable } from './table'
import { parseColumns } from './helper'

import { useStore } from './store'

export const Table = observer(<RecordType extends object=any> (props: TableProps<RecordType>) => {
  const {
    columns: outerColumns,
    title,
    toolbar = false,
    ...restProps
  } = props

  const { name } = useContext(SearchBoxContext)
  const columns = useMemo(() => parseColumns(outerColumns), [outerColumns])
  const showToolbar = useMemo(() => !!name && toolbar, [name, toolbar])
  const store = useStore({ columns, showToolbar, name })

  const finalColumns = useMemo(() => {
    const newOrder = store.order.filter(({ title, dataIndex }) => {
      if (store.checked.includes(dataIndex as string)) {
        return true
      }
      return false
    })

    return newOrder.map((orderItem) => {
      const target = columns.find(({ dataIndex }) => dataIndex === orderItem.dataIndex)
      return { ...target, ...orderItem }
    })
  }, [store.checked, columns, store.order])

  return (
    <div className="table-box">
      <InternalTable
        title={showToolbar ? () => <Toolbar title={title} store={store} /> : title}
        columns={finalColumns}
        {...restProps}
        {...store.tableConfig}
      />
    </div>
  )
})
