import {
  set,
  get,
  remove,
  makeObservable,
  observable,
  action
} from 'mobx'
import { ParamKey, ParamValue, SearchBoxParams } from './interface'
import { Mitt } from './mitt'

export class SearchBoxStore extends Mitt {
  params: SearchBoxParams;

  constructor () {
    super()
    this.params = {}
    makeObservable(this, {
      params: observable,
      getParams: action,
      setParams: action,
      resetParams: action,
      removeParams: action,
      search: action
    })
  }

  getParams = (key?: ParamKey): ParamValue | ParamValue[] | SearchBoxParams => {
    if (typeof key === 'string') return get(this.params, key)
    if (Array.isArray(key)) {
      const result = {}
      key.forEach(k => {
        const value = this.getParams(k)
        result[k] = value || undefined
      })
      return result
    }
    return this.params
  };

  setParams = (obj: SearchBoxParams) => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        set(this.params, key, obj[key])
      })
    }
  };

  resetParams = (obj: SearchBoxParams) => {
    this.params = obj
  };

  removeParams = (key: string | string[]) => {
    if (typeof key === 'string') {
      remove(this.params, key)
    }
    if (Array.isArray(key)) {
      key.forEach((k: string) => {
        remove(this.params, k)
      })
    }
  };

  search = (obj?: SearchBoxParams) => {
    if (obj) this.setParams(obj)
    this.emit('search')
  };
}
