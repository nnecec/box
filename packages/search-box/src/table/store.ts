import { useMemo } from 'react'
import { useLocalObservable } from 'mobx-react-lite'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { Orange } from '@nnecec/search-box-core'
import {
  TABLE_BOX_TOOLBAR_CHECKED_COLUMNS,
  TABLE_BOX_TOOLBAR_COLUMNS_ORDER,
  TABLE_BOX_TOOLBAR_TABLE_CONFIG
} from '../utils/constant'
import { defaultTableConfig } from './constant'
import { TableStore, Order } from './interface'

export const useStore = ({ columns, showToolbar, name }) => {
  const orange = useMemo(() => new Orange('localStorage', { name }), [name])
  const originOrder = useMemo<Order[]>(
    () =>
      columns.map(({ title, dataIndex, fixed }) => ({
        dataIndex: dataIndex || title,
        title,
        fixed
      })),
    [columns]
  )
  const originChecked = useMemo<CheckboxValueType[]>(
    () => columns.map(({ dataIndex }) => dataIndex as CheckboxValueType),
    [columns]
  )
  // user configs
  const store = useLocalObservable<TableStore>(() => ({
    // columns order config
    order:
      (showToolbar && orange.get(TABLE_BOX_TOOLBAR_COLUMNS_ORDER)) ||
      originOrder,
    setOrder (newOrder: Order[]) {
      this.order = newOrder
      if (showToolbar) {
        orange.set(TABLE_BOX_TOOLBAR_COLUMNS_ORDER, newOrder)
      }
    },
    // checked columns config
    checked:
      (showToolbar && orange.get(TABLE_BOX_TOOLBAR_CHECKED_COLUMNS)) ||
      originChecked,
    setChecked (newChecked: CheckboxValueType[]) {
      this.checked = newChecked
      if (showToolbar) {
        orange.set(TABLE_BOX_TOOLBAR_CHECKED_COLUMNS, newChecked)
      }
    },
    resetColumnsConfig () {
      this.order = originOrder
      this.checked = originChecked
      if (showToolbar) {
        orange.remove([
          TABLE_BOX_TOOLBAR_COLUMNS_ORDER,
          TABLE_BOX_TOOLBAR_CHECKED_COLUMNS
        ])
      }
    },

    // table config
    tableConfig: showToolbar
      ? orange.get(TABLE_BOX_TOOLBAR_TABLE_CONFIG) || defaultTableConfig
      : {},
    setTableConfig (newConfig) {
      this.tableConfig = newConfig
      if (showToolbar) {
        orange.set(TABLE_BOX_TOOLBAR_TABLE_CONFIG, newConfig)
      }
    },
    resetTableConfig () {
      this.tableConfig = defaultTableConfig
      if (showToolbar) {
        orange.remove([TABLE_BOX_TOOLBAR_TABLE_CONFIG])
      }
    }
  }))
  return store
}
