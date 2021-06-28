import React from 'react'
import { Input } from 'antd'
import { mount } from 'enzyme'
import SearchBox, { Box, useSearchBox } from '..'

describe('SearchBox(Core): SearchBox', () => {
  it('mount', () => {
    const wrapper = mount(
      <div>
        <SearchBox>
          <Box name="name">
            <Input />
          </Box>
        </SearchBox>
      </div>
    )

    wrapper.unmount()
  })

  it('test searchBoxInstance', () => {
    const onChange = jest.fn()

    global.window = Object.create(window)
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        pathname: '/',
        search:
          '?unit-test-search-box=%7B"name"%3A"nnecec"%7D&unit-test-error=%7B"name"%_ERROR_JSON_3A"nnecec"%7D'
      }
    })

    let searchBox
    const Test = () => {
      const [_searchBox] = useSearchBox()
      searchBox = _searchBox
      return (
        <div>
          <SearchBox
            searchBox={searchBox}
            name="unit-test-search-box"
            onSearch={onChange}
          >
            <Box name="name">
              <Input />
            </Box>
          </SearchBox>
        </div>
      )
    }
    const wrapper = mount(<Test />)
    wrapper.find('input').simulate('change', { target: { value: 'nnecec' } })
    expect(onChange).toHaveBeenCalledWith({ name: 'nnecec' })

    wrapper.unmount()

    const wrapper2 = mount(
      <div>
        <SearchBox name="unit-test-error" onSearch={onChange}>
          <Box name="name">
            <Input />
          </Box>
        </SearchBox>
      </div>
    )
    wrapper2.unmount()
  })

  it('SearchBox: BeforeFilter', () => {
    const onChange = jest.fn()

    global.window = Object.create(window)
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        pathname: '/',
        search: '?unit-test-search-box=%7B"name"%3A"nnecec"%7D'
      }
    })

    const wrapper = mount(
      <div>
        <SearchBox
          name="unit-test-search-box"
          onSearch={onChange}
          beforeFilter={values => values}
        >
          <Box name="name">
            <Input />
          </Box>
        </SearchBox>
      </div>
    )
    wrapper.unmount()

    const wrapper1 = mount(
      <div>
        <SearchBox
          name="unit-test-search-box"
          onSearch={onChange}
          beforeFilter={[values => values, values => values]}
        >
          <Box name="name">
            <Input />
          </Box>
        </SearchBox>
      </div>
    )
    wrapper1.unmount()
  })
})
