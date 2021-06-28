import React from 'react'
import { ColumnType, TableProps as AntdTableProps } from 'antd/lib/table'
import { tuple } from '../utils/type'

import { CheckboxValueType } from 'antd/lib/checkbox/Group'

export type RenderEnhancerResult =
  | React.ReactElement
  | string
  | number
  | boolean;

export interface OperatorOption<RecordType> {
  label?: string;
  key?: React.Key;
  component: any;
  onClick?: (record: RecordType, index: number) => void;
  menu?: OperatorOption<RecordType>[];
}

const CustomColumnTypes = tuple('operator')
export type CustomColumnType = typeof CustomColumnTypes[number];

export interface TableProps<RecordType> extends AntdTableProps<RecordType> {
  columns: TableColumns<RecordType>;
  toolbar: boolean;
}

export interface TableColumn<RecordType> extends ColumnType<RecordType> {
  type?: CustomColumnType;
  enum?: any;
  bool?: boolean;
  placeholder?: string;
  options?: (record: RecordType) => any;
  ellipsis?: boolean;
  copyable?: boolean;
}
export type TableColumns<RecordType> = TableColumn<RecordType>[];

export type Order<RecordType = unknown> = Pick<
  ColumnType<RecordType>,
  'title' | 'dataIndex' | 'fixed'
>;
export interface TableStore {
  order: Order[];
  setOrder: (order: Order[]) => void;
  checked: CheckboxValueType[];
  setChecked: (checked: CheckboxValueType[]) => void;
  tableConfig: any;
  setTableConfig: (newConfig:any) => void;
  resetColumnsConfig: () => void;
  resetTableConfig: () => void;
}
