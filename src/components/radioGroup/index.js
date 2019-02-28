import './style/index.less'
import { prefix } from '..'
const prefixClass = `${prefix}-radio-group`
export default {
  props: {
    modelData: {}
  },
  model: {
    prop: 'modelData',
    event: 'input'
  },
  watch: {
    modelData (value) {
      if (this.modelData !== value) {
        this.$emit('change', value)
      }
    }
  },
  render () {
    const children = this.$slots.default.filter(child => child.componentOptions && child.componentOptions.Ctor.extendOptions.name === 'ui-radio')
    return (
      <div class={prefixClass}>
        <div class={`${prefix}-wrapper display-flex flex-col-center`}>
          {children}
        </div>
      </div>
    )
  }
}
