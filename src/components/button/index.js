import './style/index.less'
import Theme from '../../utils/theme'
import Ripple from '../ripple'
import { createFrameworkClass } from '../../utils/'
export default {
  name: 'nick-button',
  props: {
    custom: {
      default: 'primary'
    },
    size: {
      default: 'normal'
    },
    shape: {
      default: ''
    },
    flat: false,
    icon: false,
    outline: false,
    disabled: false,
    ripple: true
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-button`
    const { custom, size, shape, disabled, flat, outline, ripple, $slots, onmousedown, onmouseup } = this
    const className = createFrameworkClass({ [prefixClass]: true, custom, size, shape, flat, outline, currentColor: outline || flat }, prefix, prefixClass)
    let effect = $slots.effect || <div disabled={disabled} class={`${prefixClass}-effect ${prefix}-${custom}`}/>
    return (
      <button onmousedown={onmousedown} onmouseup={onmouseup} disabled={disabled} type="button" class={className}>
        { effect}
        <Ripple ref="ripple"></Ripple>
        <div class={`${prefixClass}-wrapper display-flex flex-row-center flex-col-center`}>
          <div class={`${prefixClass}-inner`}>
            {$slots.default}
          </div>
        </div>
      </button>
    )
  },
  methods: {
    onmousedown (event) {
      const { ripple } = this.$refs
      if (ripple && ripple.rippleShow) {
        ripple.rippleShow(event)
      }
    },
    onmouseup () {
      const { ripple } = this.$refs
      if (ripple && ripple.rippleHide) {
        ripple.rippleHide(event)
      }
    },
    onclick (event) {
      // const { ripple } = this.$refs
      this.$emit('click', event)
      // if (ripple && ripple.rippleClick) {
      //   ripple.rippleClick(event)
      // }
    }
  }
}
