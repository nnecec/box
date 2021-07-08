import 'react-app-polyfill/ie11'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import {
  Form,
  Input,
  Button,
  Badge,
  Tag,
  Row,
  Col,
  DatePicker,
  message,
  Tree,
  Slider,
  Rate
} from 'antd'
import {
  SearchBox
} from '@nnecec/search-box'

import 'antd/dist/antd.css'

const {
  SchemaForm,
  Tabs,
  Table,
  Control,
  useModal
} = SearchBox

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const schema = {
  type: 'object',
  properties: {
    grid: {
      type: 'void',
      'x-component': 'FormGrid',
      'x-component-props': {
        maxColumns: 3
      },
      properties: {
        string: {
          type: 'string',
          title: 'String',
          'x-decorator': 'FormItem',
          'x-component': 'Input'
        },
        radio: {
          type: 'string',
          enum: [{
            label: '1',
            value: 1
          }, {
            label: '2',
            value: 2
          }, {
            label: '3',
            value: 3
          }, {
            label: '4',
            value: 4
          }],
          title: 'Radio',
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group'
        },
        sort: {
          type: 'string',
          enum: [
            {
              label: 'created',
              value: 1
            },
            {
              label: 'updated',
              value: 2
            },
            {
              label: 'comments',
              value: 3
            }
          ],
          title: 'Sort',
          'x-decorator': 'FormItem',
          'x-component': 'Select'
        },
        checkbox: {
          type: 'string',
          enum: [{
            label: '1',
            value: 1
          }, {
            label: '2',
            value: 2
          }, {
            label: '3',
            value: 3
          }, {
            label: '4',
            value: 4
          }],
          title: 'Checkbox',
          'x-decorator': 'FormItem',
          'x-component': 'Checkbox.Group'
        },
        number: {
          type: 'number',
          title: '数字',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker'
        },
        boolean: {
          type: 'boolean',
          title: '开关选择'
        },
        since: {
          type: 'string',
          title: 'Since',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker'
        },
        time: {
          type: 'string',
          title: '时间',
          'x-decorator': 'FormItem',
          'x-component': 'TimePicker'
        },
        timerange: {
          type: 'string',
          title: '时间范围',
          'x-decorator': 'FormItem',
          'x-component': 'TimePicker'
        },
        treeselect: {
          type: 'string',
          title: '树形选择器',
          'x-decorator': 'FormItem',
          'x-component': 'TreeSelect',
          enum: [
            {
              label: 'Node1',
              value: '0-0',
              children: [
                {
                  label: 'Child Node1',
                  value: '0-0-1'
                },
                {
                  label: 'Child Node2',
                  value: '0-0-2'
                }
              ]
            },
            {
              label: 'Node2',
              value: '0-1'
            }
          ]
        },
        cascader: {
          type: 'string',
          title: '级联选择器',
          'x-decorator': 'FormItem',
          'x-component': 'Cascader',
          enum: [
            {
              label: 'Node1',
              value: '0-0',
              children: [
                {
                  label: 'Child Node1',
                  value: '0-0-1'
                },
                {
                  label: 'Child Node2',
                  value: '0-0-2'
                }
              ]
            },
            {
              label: 'Node2',
              value: '0-1'
            }
          ]
        }
      }
    }
  }
}
const { Box, useSearchBox } = SearchBox

const fetchList = params => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (params.currentPage < 10) {
        resolve([{ id: 1, title: 'First', enum: 1, description: 'oh my gosh!', withYou: 1 }, { id: 2, enum: 2, description: '2021年，中国共产党迎来百年华诞。中共中央决定，今年在全党开展党史学习教育，激励全党不忘初心、牢记使命，在新时代不断加强党的建设。如何学好党史？让我们一起回顾习近平总书记在学习党史方面的重要论述。', withYou: false }, { id: 3, title: 'Third', enum: 3 }])
      }
      resolve([])
    }, 1000)
  })
}

const App = () => {
  const [list, setList] = useState([{ a: 1, b: 2, c: 3 }])
  const [loading, setLoading] = useState(false)
  const [searchBox] = useSearchBox()
  const [form] = Form.useForm()

  useEffect(() => {
    searchBox.search()
  }, [])

  const [agreeModal, agreeModalElement] = useModal({
    title: 'Agree',
    content: record => (
      <Form preserve={false}>
        {record.id}
        <Form.Item
          name="name"
          label="name"
          rules={[{ required: true, message: 'please input name.' }]}
        >
          <Input placeholder="name" />
        </Form.Item>
        <Form.Item name="agree" label="agree">
          <Input placeholder="agree" />
        </Form.Item>
        <button onClick={() => agreeModal.destroy()}>close</button>
      </Form>
    ),
    onOk: tools => {
      console.log(tools)
      const { form, close, record } = tools
      form.validateFields().then(data => {
        console.log(data)
      })
    }
  })

  const onSearch = values => {
    setLoading(true)
    console.log(values)

    fetchList(values).then(data => {
      setList(data)
      setLoading(false)
    })
  }

  return (
    <div>
      {/* <Form> */}
        <SearchBox
          onSearch={onSearch}
          searchBox={searchBox}
          name="searching"
        >
          <SchemaForm schema={schema} collapsed="*(checkbox,number,boolean,since,daterange,year,month,time,timerange,week)" submitButtonProps={{ htmlType: 'button' }}></SchemaForm>
          <SearchBox.Form form={form} {...layout}>
            <Row gutter={20}>
              <Col span={6}>
                <Form.Item label="String" name="string">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="时间范围" name="dateRange">
                  <DatePicker.RangePicker />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Button
                  onClick={() => {
                    form.setFieldsValue({
                      dateRange: [moment().subtract(3, 'days'), moment()]
                    })
                  }}
                >
                  近三天
                </Button>
                <Button
                  onClick={() => {
                    form.setFieldsValue({
                      dateRange: [moment().subtract(1, 'months'), moment()]
                    })
                  }}
                >
                  近一月
                </Button>
              </Col>
            </Row>
          </SearchBox.Form>
          <Control
            configs={[
              {
                label: 'Add',
                onClick () {
                  console.log('add')
                }
              }
            ]}
          ></Control>
          <Tabs
            name="state"
            configs={[
              {
                label: 'all',
                value: 1,
                default: true
              },
              {
                label: 'open',
                value: 2
              },
              {
                label: 'closed',
                value: 3
              }
            ]}
          />
          <Table
            toolbar
            // scroll={{ x: 2000 }}
            columns={[
              {
                title: 'ID',
                dataIndex: 'id',
                copyable: true
              },
              {
                title: 'Title',
                dataIndex: 'title',
                placeholder: '-'
              },
              {
                title: 'Description',
                dataIndex: 'description'
              },
              {
                title: 'is She with you?',
                dataIndex: 'withYou',
                bool: true
              },
              {
                title: 'Enum',
                dataIndex: 'enum',
                enum: {
                  1: 'one',
                  2: 'two',
                  3: 'three'
                }
              },
              {
                title: 'State',
                dataIndex: 'state',
                render (text, record) {
                  if (text === 'closed') {
                    return <Badge status="error" text="closed" />
                  }
                  if (text === 'open') {
                    return <Badge status="success" text="open" />
                  }
                }
              },
              {
                title: 'Operation',
                dataIndex: 'operator',
                type: 'operator',
                fixed: 'right',
                options: record => [
                  {
                    label: 'view',
                    onClick () {
                      message.info('view')
                      console.log('view')
                    }
                  },
                  {
                    label: 'agree',
                    onClick () {
                      agreeModal.show({ id: 1234 })
                    }
                  },
                  {
                    label: 'recall',
                    component: 'popconfirm',
                    title: 'Make sure you want to cancel?'
                  },
                  {
                    label: 'more',
                    component: 'menu',
                    menu: [
                      {
                        label: 'delete',
                        onClick () {
                          message.error('delete done!')
                        }
                      },
                      {
                        label: 'finish',
                        onClick () {
                          message.success('finish done!')
                        }
                      }
                    ]
                  }
                ]
              }
            ]}
            loading={loading}
            dataSource={list}
            pagination={{ total: 200 }}
          />
        </SearchBox>
      {/* </Form> */}
      {agreeModalElement}

      <SearchBox onSearch={onSearch} name="search-box-2">
        <Box name="shinySlider" searchTrigger="onAfterChange">
          <Slider></Slider>
        </Box>
        <Box name="shinyStar">
          <Rate></Rate>
        </Box>
        <Box name="name">
          <Input></Input>
        </Box>
        <Box name="tree" valuePropName="selectedKeys" trigger="onSelect">
          <Tree
            treeData={[
              {
                title: 'parent 1',
                key: '0-0',
                children: [
                  {
                    title: 'parent 1-0',
                    key: '0-0-0',
                    disabled: true,
                    children: [
                      {
                        title: 'leaf',
                        key: '0-0-0-0',
                        disableCheckbox: true
                      },
                      {
                        title: 'leaf',
                        key: '0-0-0-1'
                      }
                    ]
                  },
                  {
                    title: 'parent 1-1',
                    key: '0-0-1',
                    children: [
                      {
                        title: <span style={{ color: '#1890ff' }}>sss</span>,
                        key: '0-0-1-0'
                      }
                    ]
                  }
                ]
              }
            ]}
          />
        </Box>
        <Table
          title={(data) => {
            // console.log(data)
            return 'Justice League'
          }
          }
          // scroll={{ x: true }}
          columns={[
            {
              title: 'Xiaomi',
              dataIndex: 'xiaomi'
            },
            {
              title: 'Apple',
              dataIndex: 'apple'
            },
            {
              title: 'Huawei',
              dataIndex: 'huawei'
            },
            {
              title: 'Operation',
              dataIndex: 'operator',
              type: 'operator',
              fixed: 'right',
              options: record => [
                {
                  label: 'view',
                  onClick () {
                    message.info('view')
                    console.log('view')
                  }
                }
              ]
            }
          ]}
          loading={loading}
          dataSource={list}
          pagination={{ total: 200 }}
        />
      </SearchBox>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
