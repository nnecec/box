import React from 'react'
import { Input } from 'antd'
import { mount } from 'enzyme'
import SearchBox, { Box, useSearchBox } from '..'

describe('SearchBox(Core): Store', () => {
  it('initialValues', () => {
    let searchBox
    const initialValues = { name: 'nnecec', age: 18 }

    const wrapper = mount(<div>
      <SearchBox
        ref={(instance) => {
          searchBox = instance
        }}
        initialValues={initialValues}
      >
        <Box name="name">
          <Input />
        </Box>
      </SearchBox>
    </div>)

    expect(searchBox.getParams()).toEqual(initialValues)
    expect(searchBox.getParams('name')).toEqual('nnecec')
    expect(searchBox.getParams(['name'])).toEqual({ name: 'nnecec' })

    wrapper.unmount()
  })

  it('update and reset params', () => {
    let searchBox

    const Test = () => {
      const [_searchBox] = useSearchBox()
      searchBox = _searchBox
      return (
        <div>
          <SearchBox searchBox={searchBox}>
            <Box name="name">
              <Input />
            </Box>
            <Box name="age">
              <Input />
            </Box>
          </SearchBox>
        </div>
      )
    }

    const wrapper = mount(<Test />)

    expect(searchBox.setParams({ name: 'nnecec' }))
    expect(searchBox.getParams('name')).toEqual('nnecec')
    expect(searchBox.setParams({ name: 'molly', age: 18 }))
    expect(searchBox.getParams()).toEqual({
      name: 'molly',
      age: 18
    })

    searchBox.resetParams({ name: 'nnecec', age: 22, sex: 'male', job: 'fe' })
    expect(searchBox.getParams()).toEqual({
      name: 'nnecec',
      age: 22,
      sex: 'male',
      job: 'fe'
    })

    searchBox.setParams({ age: 20 })
    expect(searchBox.getParams()).toEqual({
      name: 'nnecec',
      age: 20,
      sex: 'male',
      job: 'fe'
    })

    searchBox.removeParams('job')
    expect(searchBox.getParams()).toEqual({
      name: 'nnecec',
      age: 20,
      sex: 'male'
    })

    searchBox.removeParams(['age', 'sex'])
    expect(searchBox.getParams()).toEqual({
      name: 'nnecec'
    })

    searchBox.setParams()
    expect(searchBox.getParams(['name', 'age'])).toEqual({
      name: 'nnecec'
    })

    wrapper.unmount()
  })

  it('invoke search', () => {
    let searchBox

    const Test = () => {
      const [_searchBox] = useSearchBox()
      searchBox = _searchBox
      return (
        <div>
          <SearchBox searchBox={searchBox}>
            <Box name="name">
              <Input />
            </Box>
          </SearchBox>
        </div>
      )
    }

    const wrapper = mount(<Test />)

    expect(searchBox.search({ name: 'nnecec' }))

    expect(searchBox.getParams(['name', 'age'])).toEqual({
      name: 'nnecec',
      age: undefined
    })
    wrapper.unmount()
  })
})
