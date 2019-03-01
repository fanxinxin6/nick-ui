import './assets/style/common/index.less'
import button from './components/button/'
import buttonGroup from './components/buttonGroup/'
import radio from './components/radio/'
import radioGroup from './components/radioGroup/'
import checkbox from './components/checkbox/'
import checkboxGroup from './components/checkboxGroup/'
import switchComponent from './components/switch/'
import switchGroup from './components/switchGroup/'
import select from './components/select/'
import tabs from './components/tabs/'
import dropdown from './components/dropdown/'
import toast from './components/toast/'
import modal from './components/modal/'
import dialog from './components/dialog/'
import scroll from './components/scroll/'
export const prefix = 'nick'
export const Button = button
export const ButtonGroup = buttonGroup
export const Radio = radio
export const RadioGroup = radioGroup
export const Checkbox = checkbox
export const CheckboxGroup = checkboxGroup
export const Switch = switchComponent
export const SwitchGroup = switchGroup
export const Select = select
export const Tabs = tabs
export const Dropdown = dropdown
export const Toast = toast
export const Modal = modal
export const Dialog = dialog
export const Scroll = scroll
export default {
  install (v) {
    const components = {
      button,
      buttonGroup,
      radio,
      radioGroup,
      checkbox,
      checkboxGroup,
      switch: switchComponent,
      switchGroup,
      select,
      tabs,
      dropdown,
      toast,
      modal,
      dialog,
      scroll
    }
    for (let [ name, component ] of Object.entries(components)) {
      v.component(`${prefix}-${name.replace(/([A-Z])/g, match => '-' + match.toLocaleLowerCase())}`, component)
    }
  }
}
