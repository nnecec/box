export interface Storage {
  set: (key: string, value: string) => any;
  get: (key: string) => any;
  remove: (key: string) => any;
  clear: () => any;
}

export interface Options {
  name?: string | null;
  storage?: Storage;
}

export type Type = 'localStorage' | 'sessionStorage' | 'location';

export type Value = object | any;
