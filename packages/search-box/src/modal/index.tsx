import React, {
  useMemo,
  useRef,
  useCallback,
  createRef,
  forwardRef,
  memo,
  useImperativeHandle
} from 'react'
import { Form } from 'antd'
import { ModalFuncProps } from 'antd/lib/modal'
import HookModal, { HookModalRef } from 'antd/lib/modal/useModal/HookModal'
import usePatchElement from 'antd/lib/_util/hooks/usePatchElement'
import { isElement } from 'react-is'
import { isFunction } from 'lodash-es'

interface UseModalProps extends ModalFuncProps {
  onOk: (getters?) => void | Promise<any> | boolean
}

const uuid = 0

interface ElementsHolderRef {
  patchElement: ReturnType<typeof usePatchElement>[1]
}

// eslint-disable-next-line react/display-name
const ElementsHolder = memo(forwardRef<ElementsHolderRef>((_props, ref) => {
  const [elements, patchElement] = usePatchElement()
  useImperativeHandle(
    ref,
    () => ({
      patchElement
    }),
    []
  )
  return <>{elements}</>
}))

export const useModal = (props: UseModalProps): any => {
  const { onOk, content, ...restProps } = props
  const modalRef = createRef<HookModalRef>()
  const holderRef = useRef<ElementsHolderRef>(null as any)
  const [form] = Form.useForm()

  const hookConfirm = useCallback((record: any) => {
    let finalContent = isFunction(content) ? content(record) : content
    const tool: any = {}
    if (isElement(finalContent)) {
      if (finalContent?.type === Form) {
        finalContent = React.cloneElement(finalContent, { form })
        tool.form = form
      }
    }

    // eslint-disable-next-line prefer-const
    let closeFunc
    const modal = (
      <HookModal
        key={`modal-${uuid}`}
        config={{
          content: finalContent,
          onOk (close) {
            return onOk({ ...tool, close, record })
          },
          okText: '确认',
          cancelText: '取消',
          ...restProps
        }}
        ref={modalRef}
        afterClose={() => {
          closeFunc()
        }}
      />
    )
    closeFunc = holderRef.current?.patchElement(modal)
  }, [])

  const fns = useMemo(
    () => ({
      show: hookConfirm,
      destroy () {
        if (modalRef.current) {
          modalRef.current.destroy()
        }
      }
    }),
    []
  )

  // eslint-disable-next-line react/jsx-key
  return [fns, <ElementsHolder ref={holderRef} />]
}
