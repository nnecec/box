import { SchemaForm, Form } from './form'
import { Table } from './table'
import { Tabs } from './tabs'
import { Control } from './control'

import { useModal } from './modal'

import InternalSearchBox, { useSearchBox } from '@nnecec/search-box-core'

type InternalSearchBoxType = typeof InternalSearchBox;

interface SearchBoxInterface extends InternalSearchBoxType {
  SchemaForm: typeof SchemaForm;
  Form: typeof Form;
  Table: typeof Table;
  Tabs: typeof Tabs;
  Control: typeof Control;
  useModal: typeof useModal;
}

const SearchBox = InternalSearchBox as SearchBoxInterface

SearchBox.SchemaForm = SchemaForm
SearchBox.Form = Form
SearchBox.Table = Table
SearchBox.Tabs = Tabs
SearchBox.Control = Control
SearchBox.useModal = useModal

export {
  SearchBox,
  SearchBoxInterface,
  useSearchBox
}
