import React, { useMemo, useEffect, useState, useContext } from 'react'
import { Button, ButtonProps } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import {
  Form as FormilySchemaForm,
  FormButtonGroup,
  FormLayout,
  Submit,
  Reset,
  FormProps
} from '@formily/antd'
import { createForm } from '@formily/core'

import { isFunction } from 'lodash-es'
import { observer } from 'mobx-react-lite'

import { SearchBoxContext } from '@nnecec/search-box-core'
import { ISchema } from '@formily/react'

import { SchemaField } from './helper'

interface SchemaFormProps extends FormProps {
  searchAfterReset?: boolean
  collapsed?: any | null
  schema: ISchema
  onSubmit?: (values: any) => any
  onReset?: (values: any) => any
  submitButtonProps?: ButtonProps
}

export const SchemaForm = observer((props: SchemaFormProps) => {
  const {
    schema,
    onSubmit,
    onReset,
    searchAfterReset = true,
    collapsed = null,
    form: externalForm,
    submitButtonProps
  } = props

  const form = useMemo(() => externalForm ?? createForm(), [])

  const [visible, setVisible] = useState(false)

  const { searchBoxInstance } = useContext(SearchBoxContext)
  const { getParams, setParams, search } = searchBoxInstance
  const params = getParams()

  useEffect(() => {
    Object.entries(params).forEach(([key, value]) => {
      const state = form.getFieldState(key, state => state)
      if (state) {
        form.setFieldState(key, state => { state.value = value })
      }
    })
  }, [])

  useEffect(() => {
    if (collapsed !== null) {
      form.setFieldState(collapsed, state => {
        state.visible = visible
      })
    }
  }, [collapsed, form, visible])

  function handleCollapsed () {
    setVisible(!visible)
  }

  function handleSubmit () {
    const { values } = form.getFormState()
    setParams(values)
    if (onSubmit) onSubmit(values)
    search()
  }

  return (
    <div
      style={{ marginBottom: 16, padding: 16, backgroundColor: '#fff' }}
      className="schema-form-box"
    >
      <FormilySchemaForm
        form={form}
        onAutoSubmit={handleSubmit}
      >
        <FormLayout labelCol={8} wrapperCol={16}>
          <SchemaField schema={schema} />
        </FormLayout>
        {
          <FormButtonGroup align="right">
            {collapsed !== null && (visible
              ? <Button onClick={handleCollapsed} type="link" icon={<UpOutlined />}>收起</Button>
              : <Button onClick={handleCollapsed} type="link" icon={<DownOutlined />}>展开</Button>)
            }

            <Reset onResetValidateSuccess={() => {
              const { values } = form.getFormState()
              if (onReset && isFunction(onReset)) {
                onReset()
              }
              setParams(values)

              if (searchAfterReset) {
                search()
              }
            }}>重置</Reset>
            {submitButtonProps?.htmlType === 'button' ? <Button onClick={handleSubmit} type="primary">查询</Button> : <Submit>查询</Submit>}
          </FormButtonGroup>
        }

      </FormilySchemaForm>
    </div >
  )
})
