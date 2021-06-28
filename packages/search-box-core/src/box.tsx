import React, { useContext } from 'react'
import { Observer, observer } from 'mobx-react-lite'
import toChildrenArray from 'rc-util/lib/Children/toArray'

import { ParamKey, ParamValue } from './interface'
import { SearchBoxContext } from './context'
import { defaultGetValueFromEvent } from './utils'

interface BoxProps {
  name: ParamKey;
  trigger?: string;
  searchTrigger?: string;
  valuePropName?: string;
  getValueFromEvent?: (...args: any[]) => any;
  getValueProps?: (value: ParamValue) => object;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

interface ChildProps {
  [name: string]: any;
}

export const Box: React.FC<BoxProps> = observer((props) => {
  const {
    children,
    trigger = 'onChange',
    searchTrigger,
    getValueFromEvent,
    valuePropName = 'value',
    getValueProps,
    name
  } = props
  const { searchBoxInstance } = useContext(SearchBoxContext)
  const { getParams, setParams, search } = searchBoxInstance

  function getOnlyChild (children: React.ReactNode): { child: React.ReactNode | null; isFunction: boolean } {
    // Support render props
    if (typeof children === 'function') {
      return {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        ...getOnlyChild(children(getControlled())),
        isFunction: true
      }
    }

    // Filed element only
    const childList = toChildrenArray(children)
    if (childList.length !== 1 || !React.isValidElement(childList[0])) {
      return { child: childList, isFunction: false }
    }

    return { child: childList[0], isFunction: false }
  }

  const { child, isFunction } = getOnlyChild(children)

  function getControlled (childProps: ChildProps = {}) {
    let control = {
      ...childProps
    }

    if (name) {
      const mergedGetValueProps =
        getValueProps || ((val: ParamValue) => ({ [valuePropName]: val }))
      const value = getParams(name)
      control = {
        ...control,
        ...mergedGetValueProps(value)
      }
    }

    // Add trigger
    const originTriggerFunc: any = control[trigger]

    control[trigger] = (...args: any[]) => {
      let newValue: ParamValue
      // get onChange return value
      if (getValueFromEvent) {
        newValue = getValueFromEvent(...args)
      } else {
        newValue = defaultGetValueFromEvent(valuePropName, ...args)
      }
      if (typeof name === 'string') {
        setParams({ [name]: newValue })
      }
      if (originTriggerFunc) {
        originTriggerFunc(...args)
      }
    }
    const _searchTrigger = searchTrigger ?? trigger
    const originSearchTriggerFunc: any = control[_searchTrigger]

    control[_searchTrigger] = (...args: any[]) => {
      if (originSearchTriggerFunc) {
        originSearchTriggerFunc(...args)
      }
      search()
    }

    return control
  }
  // Not need to `cloneElement` since user can handle this in render function self
  let returnChildNode: React.ReactNode
  if (isFunction) {
    returnChildNode = child
  } else if (React.isValidElement(child)) {
    returnChildNode = React.cloneElement(
      child as React.ReactElement,
      getControlled((child as React.ReactElement).props)
    )
  } else {
    // eslint-disable-next-line no-console
    console.warn('`children` of Field is not validate ReactElement.')
    returnChildNode = child
  }

  return <Observer>{() => <>{returnChildNode}</>}</Observer>
})
