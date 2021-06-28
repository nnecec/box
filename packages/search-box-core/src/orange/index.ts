import * as local from './local-storage'
import * as session from './session-storage'
import * as query from './location-storage'
import { Options, Storage, Type, Value } from './types'
import { toParsed, toStringify } from './utils'

export class Orange {
  storage: Storage;
  name: string | null = null;

  constructor (type?: Type, options?: Options) {
    if (type === 'location') {
      this.storage = query
    } else if (type === 'localStorage') {
      this.storage = local
    } else {
      this.storage = session
    }
    if (options?.name) {
      this.name = options.name
    }
  }

  set (key: string, value: Value) {
    try {
      let needCachedString: string | null = null
      if (this.name) {
        const cachedValue = this.get(key, true) || {}
        cachedValue[this.name] = value
        needCachedString = toStringify(cachedValue)
      } else {
        needCachedString = toStringify(value)
      }

      this.storage.set(key, needCachedString)
    } catch (err) {
      console.error(err)
    }
  }

  get (key: string, withoutKey: boolean = false): Value | null {
    try {
      const cachedString = this.storage.get(key)
      const needReturnValue = toParsed(cachedString)
      if (withoutKey) {
        return needReturnValue
      }

      if (this.name) {
        return needReturnValue[this.name]
      }
      return needReturnValue
    } catch (err) {
      console.error(err)
      return null
    }
  }

  remove (keys: string | string[]) {
    const needRemoveKeys = Array.isArray(keys) ? keys : [keys]

    try {
      if (this.name) {
        for (const key of needRemoveKeys) {
          const cachedValue = this.get(key, true)
          delete cachedValue[this.name]
          const needCachedString = toStringify(cachedValue)
          this.storage.set(key, needCachedString)
        }
      } else {
        for (const key of needRemoveKeys) {
          this.storage.remove(key)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  clear () {
    try {
      this.storage.clear()
    } catch (err) {
      console.error(err)
    }
  }
}
