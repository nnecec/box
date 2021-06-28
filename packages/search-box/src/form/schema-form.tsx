import React, { useEffect, useState, useContext } from 'react'
import { Button } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import {
  SchemaForm as FormilySchemaForm,
  FormButtonGroup,
  Submit,
  Reset,
  IAntdSchemaFormProps,
  FormPathPattern,
  createFormActions
} from '@formily/antd'
import { isFunction } from 'lodash-es'
import { observer } from 'mobx-react-lite'

import { SearchBoxContext } from '@nnecec/search-box-core'
import { components as presetComponents } from './helper'

let actions: any = createFormActions()

interface SchemaFormProps extends IAntdSchemaFormProps {
  searchAfterReset?: boolean
  collapsed?: FormPathPattern|null
}

export const SchemaForm = observer((props: SchemaFormProps) => {
  const {
    schema,
    onReset,
    onSubmit,
    searchAfterReset = true,
    components,
    collapsed = null,
    actions: outerActions,
    ...restProps
  } = props

  const [visible, setVisible] = useState(false)

  const { searchBoxInstance } = useContext(SearchBoxContext)
  const { getParams, setParams, search } = searchBoxInstance
  const params = getParams()

  actions = outerActions ?? actions

  useEffect(() => {
    Object.entries(params).forEach(([key, value]) => {
      const state = actions.getFieldState(key, state => state)
      if (state) {
        actions.setFieldState(key, state => { state.value = value })
      }
    })
  }, [])

  useEffect(() => {
    if (collapsed !== null) {
      actions.setFieldState(collapsed, state => {
        state.visible = visible
      })
    }
  }, [collapsed, visible])

  function handleCollapsed () {
    setVisible(!visible)
  }

  return (
    <div
      style={{ marginBottom: 16, padding: 16, backgroundColor: '#fff' }}
      className="schema-form-box"
    >
      <FormilySchemaForm
        schema={schema}
        components={components || presetComponents}
        labelCol={8}
        wrapperCol={24}
        {...restProps}
        onSubmit={(values) => {
          setParams(values)

          if (onSubmit) onSubmit(values)
          search()
        }}
        onReset={() => {
          const { values } = actions.getFormState()
          if (onReset && isFunction(onReset)) {
            onReset()
          }
          setParams(values)

          if (searchAfterReset) {
            search()
          }
        }}
        actions={actions}
      >
        <FormButtonGroup align="end" style={{ justifyContent: 'flex-end' }}>
          {collapsed !== null && (visible
            ? <Button onClick={handleCollapsed} type="link" icon={<UpOutlined />}>收起</Button>
            : <Button onClick={handleCollapsed} type="link" icon={<DownOutlined />}>展开</Button>)}
          <Reset forceClear>还原</Reset>
          <Submit>查询</Submit>
        </FormButtonGroup>
      </FormilySchemaForm>
    </div>
  )
})
