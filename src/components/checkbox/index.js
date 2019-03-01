import './style/index.less'
import { prefix } from '..'
const prefixClass = `${prefix}-checkbox`
export default {
  name: 'ui-checkbox',
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
    modelData: {
      type: Array
    }
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
    checked () {
      const { modelData } = (this.isGroup ? this.$parent : this)
      return new Set(modelData).has(this.value)
    }
  },
  render () {
    const { custom, size, disabled, clicked, $slots, onclick, checked } = this
    const className = `${prefixClass} ` + [custom, size, clicked ? 'clicked' : ''].map(className => className ? `${prefixClass}-${className}` : '').join(' ')
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
      const { value } = this
      let modelData = new Set((this.isGroup ? this.$parent : this).modelData)
      if (modelData.has(value)) {
        modelData.delete(value)
      } else {
        modelData.add(value)
      }
      modelData = [...modelData]
      if (this.isGroup) {
        this.$parent.$emit('input', modelData)
      } else {
        this.$emit('input', modelData)
      }
      this.$emit('change', modelData, event)
      if (this.checked) return
      this.clicked = false
      setTimeout(() => {
        this.clicked = true
      }, 17)
    }
  }
}
