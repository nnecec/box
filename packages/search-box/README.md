# Search Box

## Install

```bash
yarn add @nnecec/search-box antd
```

## Usage

```js
<SearchBox onSearch={onSearch} searchBox={searchBox} name="current-module-name">
  <SchemaForm schema={schema} />
  <Form>
    <Form.Item label="String" name="string">
      <Input />
    </Form.Item>
  </Form>
  <Tabs
    name="state"
    configs={[
      {
        label: "all",
        value: "all"
      },
      {
        label: "open",
        value: "open"
      },
      {
        label: "closed",
        value: "closed"
      }
    ]}
  />
  <Table
    columns={[
      {
        title: "Title",
        dataIndex: "title"
      },
      {
        title: "Operation",
        type: "operator",
        options: record => [
          {
            label: "view",
            onClick: () => {
              window.open(record.html_url);
            }
          }
        ]
      }
    ]}
    loading={loading}
    dataSource={list}
  />
</SearchBox>
```

| Property     | Description                     | Type           | Default |
| ------------ | ------------------------------- | -------------- | ------- |
| onSearch     | search callback                 | -              | -       |
| searchBox    | searchBox instance              | -              | -       |
| name         | cache params by location.search | string         | -       |
| beforeFilter | parse location.search           | () => params[] | -       |

## SchemaForm

> Support formily SchemaForm props

| Property         | Description               | Type    | Default |
| ---------------- | ------------------------- | ------- | ------- |
| schema           | JSON Schema               | -       | -       |
| searchAfterReset | call onSubmit after reset | boolean | true    |

## Form

> Support antd Form props

| Property         | Description               | Type    | Default |
| ---------------- | ------------------------- | ------- | ------- |
| form             | formInstance              | -       | -       |
| searchAfterReset | call onSubmit after reset | boolean | true    |

## Table

> Support antd Table props

### extend Table column config

| Property | Description | Type                   | Default |
| -------- | ----------- | ---------------------- | ------- |
| type     | params key  | 'operator' \| 'sorted' | -       |

`type === 'operator'`时，支持`options`属性

```js
options: [
  {
    label: "编辑",
    onClick: record => {}
  }
];
// or
options: record => [
  {
    label: "编辑",
    onClick: record => {}
  }
];
```

| Property | Description | Type                   | Default |
| -------- | ----------- | ---------------------- | ------- |
| type     | params key  | 'operator' \| 'sorted' | -       |

## Tabs

> Support antd Tabs props

| Property | Description | Type         | Default |
| -------- | ----------- | ------------ | ------- |
| name     | params key  | string       | -       |
| configs  | tabs config | TabsConfig[] | -       |

### TabsConfig

| Property | Description | Type                | Default |
| -------- | ----------- | ------------------- | ------- |
| label    | tab label   | string \| ReactNode | -       |
| value    | tab value   | string \| number    | -       |
| default  | default tab | boolean             | -       |

## useModal

当传入的 `content` 为 Form 组件时，`onOk` 可以接受该 Form 实例 `form`

```js
const [modal, element] = useModal({
  content: (
    <Form preserve={false}>
      <Form.Item
        name="name"
        label="name"
        rules={[{ required: true, message: "please input name." }]}
      >
        <Input placeholder="name" />
      </Form.Item>
    </Form>
  ),
  onOk: tools => {
    const { form, close } = tools;
    // ...
  }
});
```
