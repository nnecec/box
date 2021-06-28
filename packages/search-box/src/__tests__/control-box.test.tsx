import React from 'react'
import { mount } from 'enzyme'
import { Button } from 'antd'
import { SearchBox, ControlBox } from '..'

describe('SearchBox(PC): Control Box Value', () => {
  it('render with config', () => {
    const onClick = jest.fn()

    const wrapper = mount(
      <SearchBox>
        <ControlBox
          configs={[
            {
              label: 'Add 1',
              onClick: onClick
            },
            {
              label: 'Add 2',
              onClick: onClick
            }
          ]}
        ></ControlBox>
      </SearchBox>
    )

    wrapper.unmount()
  })
  it('render with children', () => {
    const onClick = jest.fn()

    const wrapper = mount(
      <SearchBox>
        <ControlBox>
          <Button onClick={onClick}>Add 1</Button>
          <Button onClick={onClick}>Add 2</Button>
        </ControlBox>
      </SearchBox>
    )

    wrapper.unmount()
  })
})
