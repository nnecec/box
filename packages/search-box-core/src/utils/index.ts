import { isFunction } from 'lodash-es'
import { useEffect, useRef } from 'react'

export const compose = (...args: any[]) => {
  return (payload: any, ...extra: any[]) => {
    return args.reduce((buf, fn) => {
      return buf !== undefined ? fn(buf, ...extra) : fn(payload, ...extra)
    }, payload)
  }
}

export const defaultGetValueFromEvent = (
  valuePropName: string,
  ...args: any[]
): any => {
  const event = args[0]
  if (event && event.target && valuePropName in event.target) {
    return (event.target as HTMLInputElement)[valuePropName]
  }

  return event
}

export const useInitial = func => {
  const mountRef = useRef(false)
  let unregister: null | Function = null
  if (!mountRef.current) {
    unregister = func()
    mountRef.current = true
  }

  useEffect(() => {
    return () => {
      if (unregister && isFunction(unregister)) {
        unregister()
      }
    }
  }, [])
}
