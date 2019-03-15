import './style/index.less'
import Theme from '../../utils/theme'
import Ripple from '../ripple'
import { createFrameworkClass } from '../../utils/'
export default {
  name: 'ui-button',
  props: {
    custom: {
      default: 'primary',
      validator: value => new Set(['primary', 'accent']).has(value)
    },
    size: {
      default: 'normal',
      validator: value => new Set(['normal', 'small', 'mendium', 'large', 'auto']).has(value)
    },
    shape: {
      default: '',
      validator: value => new Set(['', 'circle', 'round']).has(value)
    },
    flat: false,
    icon: false,
    outline: false,
    disabled: false
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-button`
    const { custom, size, shape, disabled, flat, outline, $slots, onclick } = this
    const className = createFrameworkClass({ [prefixClass]: true, custom, size, shape, flat, outline }, prefix, prefixClass)
    let effect = $slots.effect || <Ripple ref="effect" class={`${prefixClass}-effect`}/>
    return (
      <button onclick={onclick} disabled={disabled} type="button" class={className}>
        { effect}
        <div class={`${prefixClass}-wrapper display-flex flex-row-center flex-col-center`}>
          <div class={`${prefixClass}-inner`}>
            {$slots.default}
          </div>
        </div>
      </button>
    )
  },
  methods: {
    onclick (event) {
      const { effect } = this.$refs
      this.$emit('click', event)
      if (effect && effect.rippleClick) {
        effect.rippleClick(event)
      }
    }
  }
}
