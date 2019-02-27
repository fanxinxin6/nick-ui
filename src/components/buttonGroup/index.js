import './style/index.less'
import { prefix } from '..'
export default {
  render () {
    const children = this.$slots.default
    return (
      <div class={`${prefix}-button-group`}>
      button-group
        {children}
      </div>
    )
  }
}
