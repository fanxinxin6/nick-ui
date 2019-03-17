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
    disabled: false,
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
  data () {
    return {
      clicked: false
    }
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-radio`
    const { checked } = this
    const custom = checked ? this.custom : 'accent'
    const { size, disabled, clicked, $slots, onclick, onmousedown, onmouseup } = this
    const className = createFrameworkClass({ [prefixClass]: true, custom, size, clicked }, prefix, prefixClass)
    let effect = $slots.effect || <div class={`${prefixClass}-effect`}/>
    this.prefixClass = prefixClass
    return (
      <button ref="container" onclick={onclick} disabled={disabled} checked={checked} type="button" class={className}>
        <div class="display-flex flex-col-center">
          <div onmousedown={onmousedown} onmouseup={onmouseup} class={`${prefixClass}-wrapper ${prefix}-inherit-${custom} display-flex flex-row-center flex-col-center`}>
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
    onmousedown () {
      this.effectEnd = false
      this.hold = true
      this.$refs.container.addEventListener('animationend', this.animationend)
      this.clicked = true
    },
    onmouseup () {
      this.hold = false
      if (this.effectEnd) {
        if (!this.hold) {
          this.clicked = false
        }
      }
    },
    animationend () {
      this.effectEnd = true
      if (!this.hold) {
        this.clicked = false
      }
      this.$refs.container.removeEventListener('animationend', this.animationend)
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
