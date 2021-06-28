---
sidebar_position: 1
---

# Search Box

Query and enhance its results tools all in one.

## Getting Started

```shell
npm i @nnecec/search-box
```

## Basic Usage

```js
import {
  SearchBox,
  Box,
} from "@nnecec/search-box";

const { SchemaForm, Tabs, Table } = SearchBox;

const App = () => {
  return (
    <SearchBox onSearch={values => console.log(values)} name="your-module">
      ...
      <Box name="input">
        <Input />
      </Box>
      <SchemaForm schema={schema} />
      <Tabs name="tab" configs={configs} />
      <Table columns={columns} dataSource={dataSource} />
    </SearchBox>
  );
};
```
