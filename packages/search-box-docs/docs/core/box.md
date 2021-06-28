---
sidebar_position: 4
---

# Box

类似 `Form.Item` 支持自定义组件接入 `SearchBox`。

## Usage

```js
<SearchBox.Box name="radioValue">
  <Radio.Group
    options={[...]}
  />
</SearchBox.Box>
```

## API

| 参数              | 说明                              | 类型                   | 默认值     |
| ----------------- | --------------------------------- | ---------------------- | ---------- |
| name              | 参数字段名                        | string                 | -          |
| trigger           | 修改 `params[name]`的时机         | string                 | 'onChange' |
| searchTrigger     | 触发`search`的时机                | string                 | 'onChange' |
| getValueFromEvent | 设置如何将 event 的值转换成字段值 | (..args: any[]) => any | -          |
| getValueProps     | 为子元素添加额外的属性            | (value: any) => any    | -          |
