import './style/index.less'
import Theme from '../../utils/theme.js'
import { createFrameworkClass } from '../../utils/index.js'
import Ripple from '../ripple/index.js'
export default {
  name: 'nick-radio',
  props: {
    custom: {
      default: 'primary'
    },
    size: {
      default: 'normal'
    },
    disabled: {
      default: false
    },
    ripple: {
      default: true
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
      return this.$parent.$options.name === 'nick-radio-group'
    },
    modelValue () {
      return this.isGroup ? this.$parent.modelData : this.modelData
    },
    checked () {
      return this.value === this.modelValue
    }
  },
  data () {
    return {
      clicked: false
    }
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-radio`
    const { checked, ripple } = this
    const custom = checked ? this.custom : 'accent'
    const { size, disabled, clicked, $slots, onclick, onmousedown } = this
    const className = createFrameworkClass({ [prefixClass]: true, custom, size, clicked }, prefix, prefixClass)
    const RippleEffect = ripple ? <div class={`${prefixClass}-effect-ripple`}><Ripple center={true} ref="ripple"></Ripple></div> : null
    const effect = $slots.effect || <div onmousedown={onmousedown} class={`${prefixClass}-effect ${prefix}-${custom} display-flex flex-row-center flex-col-center`}>{RippleEffect}<div class={`${prefixClass}-effect-inner`}></div></div>
    this.prefixClass = prefixClass
    return (
      <button ref="container" onclick={onclick} disabled={disabled} checked={checked} type="button" class={className}>
        <div class="display-flex flex-col-center">
          {effect}
          <div class={`${prefixClass}-wrapper display-flex flex-row-center flex-col-center`}>
            <div class={`${prefixClass}-inner`}>
              {$slots.default}
            </div>
          </div>
        </div>
      </button>
    )
  },
  methods: {
    onmousedown (event) {
      const { disabled } = this
      if (disabled || disabled === '') {
        return
      }
      const { ripple } = this.$refs
      if (ripple && ripple.rippleShow) {
        ripple.rippleShow(event)
      }
    },
    onclick (event) {
      const { value, modelValue } = this
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
