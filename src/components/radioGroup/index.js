import './style/index.less'
import Theme from '../../utils/theme'
export default {
  name: 'radio-group',
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
    const { prefix } = Theme
    const prefixClass = `${prefix}-radio-group`
    const children = this.$slots.default.filter(child => child.componentOptions && child.componentOptions.Ctor.extendOptions.name === 'radio')
    return (
      <div class={prefixClass}>
        <div class={`${prefix}-wrapper display-flex flex-col-center`}>
          {children}
        </div>
      </div>
    )
  }
}
