import { SearchBoxStore } from './store'

export type InternalParamKey = (string | number)[];
export type ParamKey = string | number | InternalParamKey;
export type ParamValue = any;

export interface SearchBoxParams {
  [name: string]: ParamValue;
}
export type SearchBoxInstance = SearchBoxStore;
export interface StoreOptions {
  name: string;
}
