import React, { useMemo, ReactNode, useContext } from 'react'
import { Tabs as AntdTabs, TabsProps as AntdTabsProps } from 'antd'
import { isFunction, toString } from 'lodash-es'
import { observer } from 'mobx-react-lite'

import { SearchBoxContext } from '@nnecec/search-box-core'

const { TabPane } = AntdTabs

interface TabConfig {
  label: string | ReactNode;
  value: number | string;
  default?: boolean;
}
interface TabsProps extends AntdTabsProps {
  configs: TabConfig[];
  name: string;
  parser?: (value: string) => number | string;
}

export const Tabs: React.FC<TabsProps> = observer(props => {
  const { configs = [], name, onChange, parser, ...restProps } = props
  const { searchBoxInstance } = useContext(SearchBoxContext)
  const { getParams, setParams, search } = searchBoxInstance
  const activeKey = getParams(name)

  const valueParser = value =>
    parser && isFunction(parser) ? parser(value) : String(value)

  const memoConfigs = useMemo(() => {
    return configs.map(config => {
      if (config.default && activeKey === undefined) {
        setParams({ [name]: valueParser(config.value) })
      }
      return {
        label: config.label,
        value: toString(config.value)
      }
    })
  }, [configs, getParams, name, setParams])

  function handleChange (tabValue: string) {
    const value = valueParser(tabValue)
    search({ [name]: value })

    if (onChange && isFunction(onChange)) onChange(tabValue)
  }

  return (
    <AntdTabs
      tabBarStyle={{ backgroundColor: '#fff', padding: '0 16px' }}
      activeKey={String(activeKey)}
      onChange={handleChange}
      {...restProps}
    >
      {memoConfigs.map(({ label, value }) => (
        <TabPane tab={label} key={value} />
      ))}
    </AntdTabs>
  )
})
