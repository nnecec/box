import { ColumnType } from 'antd/lib/table'

import { TableColumns } from './interface'
import { parseColumnConfig } from './enhancer'

// render operators

export function parseColumns<RecordType> (
  columns: TableColumns<RecordType>
): ColumnType<RecordType>[] {
  return columns.map(column => parseColumnConfig(column))
}
