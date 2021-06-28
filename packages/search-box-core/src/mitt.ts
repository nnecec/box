import mitt, { Emitter } from 'mitt'

export class Mitt {
  constructor () {
    Object.assign(this, mitt())
  }
}

type Events = {
  search?: object
  [customKey: string]: any
}

// eslint-disable-next-line no-redeclare
export interface Mitt extends Emitter<Events> { }
