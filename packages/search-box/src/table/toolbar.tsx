import React, { useState, useEffect, useMemo } from 'react'
import { ReactSortable, ItemInterface } from 'react-sortablejs'
import { Divider, Row, Col, Button, Popover, Checkbox, Tooltip, Form, Select, Space, Switch } from 'antd'
import { VerticalAlignTopOutlined, VerticalAlignBottomOutlined, BarsOutlined, VerticalAlignMiddleOutlined, UndoOutlined, SettingOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'

import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { ColumnTitle } from 'antd/lib/table/interface'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { FixedType } from 'rc-table/lib/interface'

import { TableStore } from './interface'
import { defaultTableConfig } from './constant'

interface ToolbarProps<RecordType> {
  title?: ColumnTitle<RecordType>
  store: TableStore
}

export const Toolbar = observer(<RecordType extends object=any> (props: ToolbarProps<RecordType>) => {
  const { title, store } = props

  function splitColumns () {
    const left: ItemInterface[] = []
    const center: ItemInterface[] = []
    const right: ItemInterface[] = []
      ; (store.order as ItemInterface[]).forEach((item) => {
      if (item.fixed === 'left') {
        left.push(item)
      } else if (item.fixed === 'right') {
        right.push(item)
      } else {
        center.push(item)
      }
    })
    return [left, center, right]
  }

  const [left, center, right] = useMemo(() => splitColumns(), [])

  const [leftOrder, setLeftOrder] = useState<ItemInterface[]>(left)
  const [centerOrder, setCenterOrder] = useState<ItemInterface[]>(center)
  const [rightOrder, setRightOrder] = useState<ItemInterface[]>(right)

  useEffect(() => {
    const newOrder = [...leftOrder, ...centerOrder, ...rightOrder].map(({ title, dataIndex, fixed }) => ({ dataIndex: dataIndex, title, fixed }))
    store.setOrder(newOrder)
  }, [leftOrder, centerOrder, rightOrder])

  const renderCheckBox = (list: ItemInterface[]) => {
    const handleFixColumn = (pos: FixedType, item: ItemInterface) => {
      const newCenterOrder = centerOrder.filter(o => o.dataIndex !== item.dataIndex)

      if (pos === 'left') {
        item.fixed = 'left'
        setLeftOrder([...leftOrder, item])
      } else if (pos === 'right') {
        item.fixed = 'right'
        setRightOrder([...rightOrder, item])
      }
      setCenterOrder([...newCenterOrder])
    }

    const handleUnFixColumn = (item: ItemInterface) => {
      const from = item.fixed
      item.fixed = false
      if (from === 'left') {
        setLeftOrder([...leftOrder.filter(o => o.dataIndex !== item.dataIndex)])
        setCenterOrder([item, ...centerOrder])
      } else {
        setRightOrder([...rightOrder.filter(o => o.dataIndex !== item.dataIndex)])
        setCenterOrder([...centerOrder, item])
      }
    }

    return list.map((item) => {
      const { title, dataIndex, fixed } = item
      return <div key={dataIndex as string}
        style={{
          padding: 4,
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <div>
          <Checkbox value={dataIndex}>{title}</Checkbox>
        </div>
        {!fixed && <div>
          <Tooltip title="固定在左侧">
            <Button type="link" size="small" icon={<VerticalAlignTopOutlined />} onClick={() => handleFixColumn('left', item)}></Button>
          </Tooltip>
          <Tooltip title="固定在右侧">
            <Button type="link" size="small" icon={<VerticalAlignBottomOutlined />} onClick={() => handleFixColumn('right', item)}></Button>
          </Tooltip>
        </div>}
        {fixed && <div>
          <Tooltip title="取消固定">
            <Button type="link" size="small" icon={<VerticalAlignMiddleOutlined />} onClick={() => handleUnFixColumn(item)}></Button>
          </Tooltip>
        </div>}
      </div>
    })
  }

  function handleCheckChange (checkedValue: CheckboxValueType[]) {
    store.setChecked(checkedValue)
  }

  const columnsSetting = (
    <Checkbox.Group
      value={store.checked}
      onChange={handleCheckChange}
    >
      {!!leftOrder?.length && <><ReactSortable
        filter=".ant-checkbox"
        list={leftOrder as ItemInterface[]}
        setList={setLeftOrder}
        animation={150}>
        {renderCheckBox(leftOrder)}
      </ReactSortable>
        <Divider style={{ margin: '4px 0' }}></Divider></>}
      <ReactSortable
        filter=".ant-checkbox"
        list={centerOrder as ItemInterface[]}
        setList={(list) => setCenterOrder(list)}
        animation={150}>
        {renderCheckBox(centerOrder)}
      </ReactSortable>
      {!!rightOrder?.length && <><Divider style={{ margin: '4px 0' }}></Divider>
        <ReactSortable
          filter=".ant-checkbox"
          list={rightOrder as any}
          setList={setRightOrder}
          animation={150}>
          {renderCheckBox(rightOrder)}
        </ReactSortable>
      </>}
    </Checkbox.Group>
  )

  function handleSelectAll (e: CheckboxChangeEvent) {
    const checked = e.target.checked
    if (checked) {
      store.setChecked(store.order.map(({ dataIndex }) => dataIndex as string))
    } else {
      store.setChecked([])
    }
  }

  function handleColumnsConfigReset () {
    store.resetColumnsConfig()
    const [left, center, right] = splitColumns()
    setLeftOrder(left)
    setCenterOrder(center)
    setRightOrder(right)
  }

  const [form] = Form.useForm()
  function handleTableConfigReset () {
    store.resetTableConfig()
    form.setFieldsValue(defaultTableConfig)
  }
  const handleValuesChange = (_, values) => {
    const { scroll, ...rest } = values

    const params = {
      scroll: {
        x: scroll ? 'max-content' : false
      },
      ...rest
    }
    store.setTableConfig(params)
  }

  const tableSetting = (
    <Form
      form={form}
      size="small"
      colon={false}
      initialValues={store.tableConfig}
      onValuesChange={handleValuesChange}
    >
      <Form.Item name="scroll" label="滚动" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item name="size" label="尺寸">
        <Select
          style={{ width: 100 }}
          options={[{
            label: '紧凑',
            value: 'small'
          }, {
            label: '正常',
            value: 'default'
          }]} />
      </Form.Item>
    </Form>
  )

  return (
    <Row justify="space-between" align="bottom">
      <Col span={4}>{title}</Col>
      <Col>
        <Space>
          <Popover
            content={columnsSetting}
            placement="bottomRight"
            trigger="click"
            title={<div style={{ marginRight: 8, display: 'flex', justifyContent: 'space-between' }}>
              <Checkbox
                indeterminate={store.checked.length > 0 && store.checked.length < store.order.length}
                onChange={handleSelectAll}
                checked={store.checked.length === store.order.length}>全选</Checkbox>
              <Tooltip title="重置并更新列配置">
                <Button type="link" size="small" icon={<UndoOutlined />} onClick={handleColumnsConfigReset}></Button>
              </Tooltip>
            </div>}>
            <Tooltip title="列配置">
              <Button icon={<BarsOutlined />} />
            </Tooltip>
          </Popover>

          <Popover
            content={tableSetting}
            placement="bottomRight"
            trigger="click"
            title={<div style={{ marginRight: 8, display: 'flex', justifyContent: 'flex-end' }}>
              <Tooltip title="重置表格配置">
                <Button type="link" size="small" icon={<UndoOutlined />} onClick={handleTableConfigReset}></Button>
              </Tooltip>
            </div>}
          >
            <Tooltip title="表格配置">
              <Button icon={<SettingOutlined />} />
            </Tooltip>
          </Popover>
        </Space>
      </Col>
    </Row>
  )
})
