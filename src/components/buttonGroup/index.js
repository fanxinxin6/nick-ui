import './style/index.less'
import Theme from '../../utils/theme'
const { prefix } = Theme
const prefixClass = `${prefix}-button-group`
export default {
  render () {
    const children = this.$slots.default.filter(child => child.componentOptions && child.componentOptions.Ctor.extendOptions.name === 'ui-button')
    return (
      <div class={prefixClass}>
        <div class={`${prefix}-wrapper display-flex flex-col-center`}>
          {children}
        </div>
      </div>
    )
  }
}
