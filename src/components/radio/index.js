import './style/index.less'
import { prefix } from '..'
const prefixClass = `${prefix}-radio`
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
    shape: {
      type: String,
      default: '',
      validator: value => new Set(['', 'circle', 'round']).has(value)
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
  data () {
    return {
      clicked: false
    }
  },
  computed: {
    isGroup () {
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
    const { custom, size, shape, disabled, clicked, $slots, onclick, checked } = this
    const className = `${prefixClass} ` + [custom, size, shape, clicked ? 'clicked' : ''].map(className => className ? `${prefixClass}-${className}` : '').join(' ')
    const effect = $slots.effect || <div class={`${prefixClass}-effect`}></div>
    return (
      <button onclick={onclick} disabled={disabled} checked={checked} type="button" class={className}>
        <div class="display-flex flex-col-center">
          <div class={`${prefixClass}-wrapper display-flex flex-row-center flex-col-center`}>
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
      if (value !== modelValue) {
        this.$emit('change', value === modelValue, event)
      }
      if (this.isGroup) {
        this.$parent.$emit('input', value)
      } else {
        this.$emit('input', value)
      }
      if (this.checked) return
      this.clicked = false
      setTimeout(() => {
        this.clicked = true
      }, 17)
    }
  }
}
