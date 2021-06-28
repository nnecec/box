import React from 'react'
import {
  Input,
  Radio,
  Checkbox,
  Select,
  ArrayCards,
  ArrayTable,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating,
  Password,
  FormCard,
  FormBlock,
  FormMegaLayout,
  FormItemGrid
} from '@formily/antd-components'
import { Cascader as AntdCascader } from 'antd'

export const Cascader = (props) => {
  const { dataSource, value, ...restProps } = props
  return (
    <AntdCascader options={dataSource} value={value || []} {...restProps} />
  )
}

export const components: {
  [key: string]: React.JSXElementConstructor<any>;
} = {
  Input,
  Radio: Radio.Group,
  Checkbox: Checkbox.Group,
  TextArea: Input.TextArea,
  number: NumberPicker,
  boolean: Switch,
  array: ArrayCards,
  cards: ArrayCards,
  table: ArrayTable,
  Switch,
  Date: DatePicker,
  DateRange: DatePicker.RangePicker,
  Year: DatePicker.YearPicker,
  Month: DatePicker.MonthPicker,
  Week: DatePicker.WeekPicker,
  Time: TimePicker,
  TimeRange: TimePicker.RangePicker,
  Upload,
  Range,
  Rating,
  Transfer,
  Password,

  // custom
  string: Input,
  input: Input,
  select: Select,
  cascader: Cascader,

  // layout
  card: FormCard,
  block: FormBlock,
  grid: FormItemGrid,
  'mega-layout': FormMegaLayout
}
