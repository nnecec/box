import React from 'react'
import { Input } from 'antd'
import { mount } from 'enzyme'
import SearchBox, { Box } from '..'
import { sleep } from '../../../../tests/utils'

async function change (wrapper, index, value) {
  wrapper
    .find(Input)
    .at(index)
    .simulate('change', { target: { value } })
  await sleep(200)
  wrapper.update()
}

describe('SearchBox(Core): Box', () => {
  it('mount', () => {
    const wrapper = mount(<div>
      <SearchBox>
        <Box name="name">
          <Input />
        </Box>
        <Box name="age">
          {({ value, onChange }) => (
            <Input value={value} onChange={e => onChange(e.target.value)} />
          )}
        </Box>
        <Box name="description">
          <Input />
          <Input.TextArea />
        </Box>
      </SearchBox>
    </div>)

    wrapper.unmount()
  })

  it('trigger & searchTrigger', async () => {
    const onChange = jest.fn()

    const wrapper = mount(<div>
      <SearchBox>
        <Box name="name">
          <Input onChange={onChange} />
        </Box>
        <Box
          name="sex"
          trigger="onChange"
          searchTrigger="onBlur"
          getValueFromEvent={onChange}
        >
          <Input />
        </Box>
        <Box
          name="sex"
          trigger="onBlur"
        >
          <Input />
        </Box>
      </SearchBox>
    </div>)

    await change(wrapper, 0, '1')
    await change(wrapper, 1, '2')
    await change(wrapper, 2, '3')

    wrapper.unmount()
  })
})
