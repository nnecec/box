import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Row, Form as AntdForm, Button, Space, FormProps as AntdFormProps } from 'antd'
import { isFunction } from 'lodash-es'
import { SearchBoxContext, utils } from '@nnecec/search-box-core'

interface FormProps extends AntdFormProps {
  searchAfterReset?: boolean
}

const { useInitial } = utils

export const Form: React.FC<FormProps> = observer((props) => {
  const {
    form: externalForm,
    onReset,
    onFinish,
    children,
    searchAfterReset = true,
    ...restProps
  } = props

  const { searchBoxInstance } = useContext(SearchBoxContext)
  const { getParams, setParams, search } = searchBoxInstance
  const params = getParams()

  const AntForm = AntdForm.useForm()

  const [form] = externalForm ? [externalForm] : AntForm

  useInitial(() => {
    form.setFieldsValue(params)
  })

  function handleFinish (values: any) {
    search(values)
    if (onFinish) onFinish(values)
  }

  function handleReset () {
    form.resetFields()
    const values = form.getFieldsValue()
    setParams(values)

    if (onReset && isFunction(onReset)) {
      onReset(values)
    }
    if (searchAfterReset) {
      search()
    }
  }

  return (
    <div
      style={{ marginBottom: 16, padding: 16, backgroundColor: '#fff' }}
      className="form-box"
    >
      <AntdForm onFinish={handleFinish} form={form} {...restProps}>
        {children}

        <Row justify="end">
          <Space align="end">
            <Button htmlType="button" onClick={handleReset}>
              还原
            </Button>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Space>
        </Row>
      </AntdForm>
    </div>
  )
})
