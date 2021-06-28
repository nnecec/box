import React from 'react'
import { mount } from 'enzyme'
import { Button } from 'antd'
import { SearchBox, TableBox } from '..'
import { TableBoxProps } from '../table-box'

const onClick = jest.fn()
const onMutation = jest.fn()
const COLUMNS: TableBoxProps<any>['columns'] = [
  {
    type: 'sorted'
  },
  {
    title: 'Title',
    dataIndex: 'title'
  },
  {
    title: 'State',
    dataIndex: 'state'
  },
  {
    title: 'Operation',
    type: 'operator',
    options: record => [
      {
        label: 'view',
        onClick: () => onClick(record)
      },
      {
        label: 'more..',
        menus: [
          {
            label: 'menu 1',
            onClick: () => onMutation(record)
          },
          {
            label: 'menu 2',
            onClick: () => onMutation(record)
          }
        ]
      },
      {
        label: 'popconfirm 1',
        popconfirm: {
          onConfirm: () => onMutation(record)
        }
      },
      <Button key="button1" onClick={() => onMutation(record)}>
        button 1
      </Button>
    ]
  }
]

const dataSource1 = [
  {
    id: 1,
    title: 'title 1',
    state: 'state 1'
  }
]

const dataSource20 = [
  { id: 1, title: 'title 1', state: 'state 1' },
  { id: 2, title: 'title 2', state: 'state 2' },
  { id: 3, title: 'title 3', state: 'state 3' },
  { id: 4, title: 'title 4', state: 'state 4' },
  { id: 5, title: 'title 5', state: 'state 5' },
  { id: 6, title: 'title 6', state: 'state 6' },
  { id: 7, title: 'title 7', state: 'state 7' },
  { id: 8, title: 'title 8', state: 'state 8' },
  { id: 9, title: 'title 9', state: 'state 9' },
  { id: 10, title: 'title 10', state: 'state 10' },
  { id: 11, title: 'title 11', state: 'state 11' },
  { id: 12, title: 'title 12', state: 'state 12' },
  { id: 13, title: 'title 13', state: 'state 13' },
  { id: 14, title: 'title 14', state: 'state 14' },
  { id: 15, title: 'title 15', state: 'state 15' },
  { id: 16, title: 'title 16', state: 'state 16' },
  { id: 17, title: 'title 17', state: 'state 17' },
  { id: 18, title: 'title 18', state: 'state 18' },
  { id: 19, title: 'title 19', state: 'state 19' },
  { id: 20, title: 'title 20', state: 'state 20' }
]

describe('SearchBox(PC): Table Box', () => {
  it('render with config', () => {
    const wrapper = mount(
      <SearchBox>
        <TableBox
          columns={COLUMNS}
          dataSource={dataSource1}
        />
      </SearchBox>
    )

    wrapper.find(Button).at(0).simulate('click')
    expect(onClick).toHaveBeenCalledWith({ title: 'title 1', state: 'state 1', id: 1 })

    wrapper.find('.ant-dropdown-trigger').first().simulate('click')
    wrapper.find('.ant-dropdown-menu-item').first().simulate('click')

    expect(onClick).toHaveBeenCalledWith({ title: 'title 1', state: 'state 1', id: 1 }, 0)

    wrapper.unmount()
  })

  it('trigger onChange', () => {
    const onSearch = jest.fn()
    const onChange = jest.fn()

    const wrapper = mount(
      <SearchBox onSearch={onSearch}>
        <TableBox
          columns={COLUMNS}
          dataSource={dataSource20}
          pagination={{
            total: dataSource20.length,
            onChange
          }}
        />
      </SearchBox>
    )

    expect(wrapper.find('.ant-pagination-item').at(0).hasClass('ant-pagination-item-active'))

    wrapper.find('.ant-pagination-item').at(1).simulate('click')

    expect(onSearch).toHaveBeenCalledWith({ pageSize: 10, currentPage: 2 })
  })
})
