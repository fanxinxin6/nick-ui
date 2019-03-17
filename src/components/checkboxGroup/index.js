import './style/index.less'
import Theme from '../../utils/theme'
export default {
  name: 'checkbox-group',
  props: {
    modelData: {}
  },
  model: {
    prop: 'modelData',
    event: 'input'
  },
  watch: {
    modelData (value) {
      this.$emit('change', value)
    }
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-checkbox-group`
    const children = this.$slots.default.filter(child => child.componentOptions && child.componentOptions.Ctor.extendOptions.name === 'checkbox')
    return (
      <div class={prefixClass}>
        <div class={`${prefix}-wrapper display-flex flex-col-center`}>
          {children}
        </div>
      </div>
    )
  }
}
