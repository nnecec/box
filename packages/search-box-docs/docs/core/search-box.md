---
sidebar_position: 2
---

# SearchBox

`SearchBox` 向内部接入的组件提供参数，并响应组件触发`onSearch`方法。

## Usage

```js
<SearchBox
  searchBox={searchBox}
  onSearch={values => console.log(values)}
  name="your-module"
>
  ...
  <Box name="input">
    <Input />
  </Box>
  <Box name="status">
    <Select options={STATUS_ENUM} />
  </Box>

  
</SearchBox>
```

## API

| 参数          | 说明                                   | 类型                | 默认值 |
| ------------- | -------------------------------------- | ------------------- | ------ |
| onSearch      | 查询方法                               | `(params) => void`  | -      |
| name          | 参数需要存储到 location 则赋予一个名称 | string              | -      |
| initialValues | params 初始值                          | {[key:string]: any} | -      |
