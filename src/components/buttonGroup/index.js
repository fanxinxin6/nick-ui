import './style/index.less'
import Theme from '../../utils/theme'
export default {
  name: 'nick-button-group',
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-button-group`
    const children = this.$slots.default
    return (
      <div class={prefixClass}>
        <div class={`${prefix}-wrapper display-flex flex-col-center`}>
          {children}
        </div>
      </div>
    )
  }
}
