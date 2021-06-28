import React, { useEffect, useContext, useRef } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table'
import { isFunction } from 'lodash-es'
import { observer } from 'mobx-react-lite'
import { SearchBoxContext, utils } from '@nnecec/search-box-core'
import { NoOne, MySelf, TABLE_BOX_DEFAULT_PAGE_SIZE } from '../utils/constant'

const { useInitial } = utils

export const InternalTable: React.FC<TableProps<any>> = observer(props => {
  const {
    rowKey,
    columns,
    dataSource,
    pagination = false,
    ...restProps
  } = props

  const { searchBoxInstance } = useContext(SearchBoxContext)
  const { getParams, setParams, search } = searchBoxInstance

  const { currentPage, pageSize } = getParams(['currentPage', 'pageSize'])
  const whoRef = useRef(NoOne)
  const isUpdate = useRef(false)

  useInitial(() => {
    if (!currentPage) {
      setParams({ currentPage: 1 })
    }

    if (!pageSize) {
      setParams({
        pageSize: (pagination && pagination.pageSize) || TABLE_BOX_DEFAULT_PAGE_SIZE
      })
    }
  })

  useEffect(() => {
    const resetCurrentPage = () => {
      if (isUpdate.current) {
        const currentPage = getParams('currentPage')

        if ((whoRef.current & MySelf) !== NoOne) {
          whoRef.current &= ~MySelf
        } else if (currentPage !== 1) {
          setParams({ currentPage: 1 })
        }
      } else {
        isUpdate.current = true
      }
    }

    searchBoxInstance.on('search', resetCurrentPage)
    return () => {
      searchBoxInstance.off('search', resetCurrentPage)
    }
  }, [getParams, searchBoxInstance, setParams])

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey || 'id'}
      pagination={pagination && {
        ...pagination,
        total: Number(pagination.total),
        pageSize: Number(pageSize) || TABLE_BOX_DEFAULT_PAGE_SIZE,
        current: Number(currentPage) || currentPage,
        onChange (page, pageSize) {
          whoRef.current |= MySelf
          search({ currentPage: page, pageSize })

          if (isFunction(pagination.onChange)) {
            pagination.onChange(page, pageSize)
          }
        },
        onShowSizeChange (_, size) {
          setParams({ currentPage: 1, pageSize: size })
        }
      }}
      {...restProps}
    />
  )
})
