import 'react-app-polyfill/ie11'
import React, { Component, createRef } from 'react'
import ReactDOM from 'react-dom'
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
  Rate,
} from 'antd'
import {
  SearchBox,
  SchemaFormBox,
  FormBox,
  TabsBox,
  TableBox,
  ControlBox,
} from '..'

import 'antd/dist/antd.css'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const schema = {
  type: 'object',
  properties: {
    NO_NAME_FIELD_$0: {
      type: 'object',
      'x-component': 'mega-layout',
      'x-component-props': {
        grid: true,
        columns: 3,
        autoRow: true,
        labelCol: 8,
        wrapperCol: 16,
      },
      properties: {
        string: {
          type: 'string',
          title: 'String',
        },
        radio: {
          type: 'string',
          enum: [1, 2, 3, 4],
          title: 'Radio',
          'x-component': 'radio',
        },
        sort: {
          type: 'string',
          enum: [
            {
              label: 'created',
              value: 1,
            },
            {
              label: 'updated',
              value: 2,
            },
            {
              label: 'comments',
              value: 3,
            },
          ],
          title: 'Sort',
        },
        checkbox: {
          type: 'string',
          enum: [1, 2, 3, 4],
          title: 'Checkbox',
          'x-component': 'checkbox',
        },
        number: {
          type: 'number',
          title: '数字',
          'x-component': 'number',
        },
        boolean: {
          type: 'boolean',
          title: '开关选择',
        },
        since: {
          type: 'string',
          title: 'Since',
          'x-component': 'date',
        },
        daterange: {
          type: 'array<date>',
          title: '日期范围',
          'x-component': 'daterange',
        },
        year: {
          type: 'string',
          title: '年份',
          'x-component': 'year',
        },
        month: {
          type: 'string',
          title: '月份',
          'x-component': 'month',
        },
        time: {
          type: 'string',
          title: '时间',
          'x-component': 'time',
        },
        timerange: {
          type: 'string',
          title: '时间范围',
          'x-component': 'timerange',
        },
        week: {
          type: 'string',
          title: '周',
          'x-component': 'week',
        },
      },
    },
  },
}
const { Box } = SearchBox
class App extends Component {
  searchBox: any

  constructor(props) {
    super(props)
    this.searchBox = createRef()
  }


  componentDidMount(){
    this.searchBox.search()
  }

  onSearch = values => {
    console.log(values)
  }

  handleRef = () => {
    const params = this.searchBox.getParams()
    console.log(params)
  }

  render() {
    return (
      <div>
        <SearchBox
          onSearch={this.onSearch}
          name="searching"
          ref={searchBox => (this.searchBox = searchBox)}
        >
          <button onClick={this.handleRef}>test ref</button>
          <SchemaFormBox schema={schema}></SchemaFormBox>
          <FormBox {...layout}>
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
            </Row>
          </FormBox>
          <ControlBox
            configs={[
              {
                label: 'Add',
                onClick() {
                  console.log('add')
                },
              },
            ]}
          ></ControlBox>
          <TabsBox
            name="state"
            configs={[
              {
                label: 'all',
                value: 1,
                default: true,
              },
              {
                label: 'open',
                value: 2,
              },
              {
                label: 'closed',
                value: 3,
              },
            ]}
          />
          <TableBox
            columns={[
              {
                title: 'Title',
                dataIndex: 'title',
                width: 200,
              },
              {
                title: 'State',
                dataIndex: 'state',
                render(text, record) {
                  if (text === 'closed') {
                    return <Badge status="error" text="closed" />
                  }
                  if (text === 'open') {
                    return <Badge status="success" text="open" />
                  }
                },
              },
              {
                title: 'Operation',
                type: 'operator',
                options: record => [
                  {
                    label: 'view',
                    onClick() {
                      window.open(record.html_url)
                    },
                  },
                  {
                    label: 'agree',
                    onClick() {
                      agreeModal.show({ id: 1234 })
                    },
                  },
                  {
                    label: 'recall',
                    popconfirm: {
                      title: 'Make sure you want to cancel?',
                    },
                  },
                  {
                    label: 'more',
                    menus: [
                      {
                        label: 'delete',
                        onClick() {
                          message.error('delete done!')
                        },
                      },
                      {
                        label: 'finish',
                        onClick() {
                          message.success('finish done!')
                        },
                      },
                    ],
                  },
                ],
              },
            ]}
            dataSource={[]}
            pagination={{ total: 200 }}
          />
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
                          disableCheckbox: true,
                        },
                        {
                          title: 'leaf',
                          key: '0-0-0-1',
                        },
                      ],
                    },
                    {
                      title: 'parent 1-1',
                      key: '0-0-1',
                      children: [
                        {
                          title: <span style={{ color: '#1890ff' }}>sss</span>,
                          key: '0-0-1-0',
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
          </Box>
        </SearchBox>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
