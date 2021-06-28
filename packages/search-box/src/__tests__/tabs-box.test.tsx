import React from 'react'
import { mount } from 'enzyme'
import { SearchBox, TabsBox } from '..'

const TABS_BOX_NAME = 'tabs'

const CONFIG = [
  {
    label: 'Tab 1',
    value: 1,
    default: true
  },
  {
    label: 'Tab 2',
    value: 2
  },
  {
    label: 'Tab 3',
    value: 3
  }
]

describe('SearchBox(PC): Tabs Box Value', () => {
  it('mount, and set value', () => {
    let searchBox
    const wrapper = mount(
      <SearchBox
        ref={instance => {
          searchBox = instance
        }}
      >
        <TabsBox name={TABS_BOX_NAME} configs={CONFIG}></TabsBox>
      </SearchBox>
    )

    expect(searchBox.getParams()).toEqual({ [TABS_BOX_NAME]: '1' })

    wrapper
      .find('.ant-tabs-tab')
      .at(2)
      .simulate('click')

    expect(searchBox.getParams()).toEqual({ [TABS_BOX_NAME]: '3' })

    searchBox.setParams({ currentPage: 2 })

    wrapper
      .find('.ant-tabs-tab')
      .at(1)
      .simulate('click')

    expect(searchBox.getParams()).toEqual({
      [TABS_BOX_NAME]: '2',
      currentPage: 1
    })

    wrapper.unmount()
  })
})

describe('SearchBox(PC): Tabs Box functions', () => {
  it('pass TabsProps to TabsBox', () => {
    const onChange = jest.fn()

    const wrapper = mount(
      <SearchBox>
        <TabsBox
          name={TABS_BOX_NAME}
          configs={CONFIG}
          onChange={onChange}
        ></TabsBox>
      </SearchBox>
    )

    wrapper
      .find('.ant-tabs-tab')
      .at(2)
      .simulate('click')

    wrapper.unmount()
  })
  it('pass parser to TabsBox', () => {
    const onChange = jest.fn()
    let searchBox
    const wrapper = mount(
      <SearchBox
        ref={instance => {
          searchBox = instance
        }}
      >
        <TabsBox
          name={TABS_BOX_NAME}
          configs={CONFIG}
          onChange={onChange}
          parser={Number}
        ></TabsBox>
      </SearchBox>
    )
    expect(searchBox.getParams()).toEqual({ [TABS_BOX_NAME]: 1 })

    wrapper
      .find('.ant-tabs-tab')
      .at(2)
      .simulate('click')

    expect(searchBox.getParams()).toEqual({ [TABS_BOX_NAME]: 3 })

    wrapper.unmount()
  })
})
