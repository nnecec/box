# Search Box

![lerna](https://img.shields.io/github/lerna-json/v/nnecec/search-box)
![test](https://github.com/nnecec/search-box/workflows/test/badge.svg)

> Inspired by [rc-field-form](https://github.com/react-component/field-form) and [pro-components](https://github.com/ant-design/pro-components)

Query and enhance its results tools all in one.

## Features

- All request params in Box.
- Record params at window.location.search.
- Use Box like playing LEGO for complex UI.
- One-config to access custom component.

## Get started

view detail [search-box docs](./packages/search-box/README.md)

### usage

```js
import { SearchBox, Box } from "@nnecec/search-box";

const { Form, SchemaForm, Tabs, Table } = SearchBox;

const App = () => {
  return (
    <SearchBox onSearch={values => console.log(values)} name="your-module">
      ...
      <Box name="input">
        <Input />
      </Box>
      <SchemaForm schema={schema} />
      <Tabs name="status" configs={configs} />
      <Table columns={columns} dataSource={dataSource} />
    </SearchBox>
  );
};
```

### development

```bash
# install dependencies
$ yarn

# start dev
$ cd packages/box-core
$ yarn start
# open another terminal
$ cd packages/search-box
$ yarn start
# open another terminal
$ cd packages/search-box/example
$ yarn && yarn start
```

### publish

```bash
# make sure in master branch
$ yarn publish
```

### test

```bash
# invoke 'test' script in each package
$ yarn test
# more...
```

## Rules

- ESLint
- Commit lint: [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)
- Unit test: [Testing Overview](https://reactjs.org/docs/testing.html)

  Recommended to view [ant-design](https://github.com/ant-design/ant-design) source code to understand how to write unit test code.

## Roadmap

- [x] support custom component
- [x] refactor core
- [x] better performance
- [ ] more and better useful Boxes / Plugins
- [x] Custom configuration(Table)
