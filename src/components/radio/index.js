import './style/index.less'
import Theme from '../../utils/theme'
import Ripple from '../ripple'
import { createFrameworkClass } from '../../utils/'
export default {
  name: 'ui-radio',
  props: {
    custom: {
      type: String,
      default: 'primary',
      validator: value => new Set(['primary']).has(value)
    },
    size: {
      type: String,
      default: 'normal',
      validator: value => new Set(['normal', 'small', 'mendium', 'large', 'auto']).has(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {},
    modelData: {}
  },
  model: {
    prop: 'modelData',
    event: 'input'
  },
  computed: {
    isGroup () {
      const { prefix } = Theme
      const prefixClass = `${prefix}-radio`
      return this.$parent.$options._componentTag === `${prefixClass}-group`
    },
    modelValue () {
      return this.isGroup ? this.$parent.modelData : this.modelData
    },
    checked () {
      return this.value === this.modelValue
    }
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-radio`
    const { custom, size, disabled, $slots, onclick, checked } = this
    const className = createFrameworkClass({ [prefixClass]: true, custom, size }, prefix, prefixClass)
    let effect = $slots.effect || <Ripple ref="effect" class={`${prefixClass}-effect`}/>
    return (
      <button onclick={onclick} disabled={disabled} checked={checked} type="button" class={className}>
        <div class="display-flex flex-col-center">
          <div class={`${prefixClass}-wrapper ${prefix}-inherit-${custom} display-flex flex-row-center flex-col-center`}>
            {effect}
          </div>
          <div class={`${prefixClass}-inner`}>
            {$slots.default}
          </div>
        </div>
      </button>
    )
  },
  methods: {
    onclick (event) {
      const { value, modelValue } = this
      const { effect } = this.$refs
      if (effect && effect.rippleClick) {
        effect.rippleClick(event, { center: true })
      }
      if (value !== modelValue) {
        this.$emit('change', value === modelValue, event)
      }
      if (this.isGroup) {
        this.$parent.$emit('input', value)
      } else {
        this.$emit('input', value)
      }
    }
  }
}
