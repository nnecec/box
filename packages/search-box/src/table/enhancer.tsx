import React, { ReactElement } from 'react'
import { Button, ButtonProps, Dropdown, Menu, Popconfirm, Typography } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { DownOutlined } from '@ant-design/icons'
import { isFunction, throttle } from 'lodash-es'
import { TableColumn, OperatorOption } from './interface'

const defaultButtonProps: Pick<ButtonProps, 'size'|'type'> = {
  size: 'small',
  type: 'link'
}

export function parseColumnConfig<T> (column: any): ColumnType<T> {
  const { type, enum: _enum, bool, ellipsis, copyable, placeholder } = column

  switch (type) {
    case 'operator':
      return renderOperator<T>(column)
    default:
      if (_enum || bool || ellipsis || copyable || placeholder) {
        return renderEnhancer<T>(column)
      }
      return column
  }
}

function renderOperator<T> (column: TableColumn<T>): ColumnType<T> {
  const { type, options, ...rest } = column

  return {
    title: '操作',
    width: 140,
    dataIndex: 'operator',
    ...rest,
    render (_, record, index) {
      return options?.(record).map((config: ReactElement|OperatorOption<T>) => {
        // support custom component
        if (React.isValidElement(config)) {
          return React.cloneElement(config)
        }
        const { label, onClick, component, menu = [], ...restConfig } = config

        switch (component) {
          case 'menu':
            return (
              <Dropdown
                overlay={<Menu key={label}>
                  {menu.map(item => (
                    <Menu.Item
                      key={item.label}
                      onClick={() => item?.onClick?.(record, index)}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu>}
                key={label}
              >
                <Button {...defaultButtonProps} {...restConfig}>
                  {label} <DownOutlined size={12} />
                </Button>
              </Dropdown>
            )
          case 'popconfirm':
            return (
              <Popconfirm
                key={label}
                placement="topRight"
                title={`确认${label}?`}
                okText="确认"
                cancelText="取消"
                {...restConfig}
              >
                <Button {...defaultButtonProps}>
                  {label}
                </Button>
              </Popconfirm>
            )
          default:
            return <Button
              key={label}
              {...defaultButtonProps}
              onClick={throttle(() => {
                if (isFunction(onClick)) {
                  onClick(record, index)
                }
              }, 500)}
              {...restConfig}
            >
              {label}
            </Button>
        }
      })
    }
  }
}

function renderEnhancer<T> (column: TableColumn<T>): ColumnType<T> {
  const { enum: _enum, bool, ellipsis, copyable, placeholder = '', render, ...rest } = column

  return {
    ...rest,
    render (text, record, index) {
      let result = text
      // first priority
      if (render) {
        result = render(text, record, index)
      } else if (_enum) {
        if (Array.isArray(_enum)) {
          const target = _enum.find(({ value }) => value === text)
          result = target?.label ?? placeholder
        }

        result = _enum[text] ?? placeholder
      } else if (bool) {
        if (text === undefined || text === null || text === '') {
          result = placeholder
        }
        result = text ? '是' : '否'
      }

      if (ellipsis || copyable) {
        result = <Typography.Text
          style={{
            maxWidth: '100%',
            margin: 0,
            padding: 0
          }}
          copyable={
            copyable && text
              ? {
                  text,
                  tooltips: ['', '']
                }
              : undefined
          }
          ellipsis={ellipsis && text ? { tooltip: text } : false}
        >
          {result}
        </Typography.Text>
      }

      return result ?? placeholder
    }
  }
}
