import './style/index.less'
import Theme from '../../utils/theme'
import { createFrameworkClass } from '../../utils/'
export default {
  name: 'nick-checkbox',
  props: {
    custom: {
      default: 'primary'
    },
    size: {
      default: 'normal'
    },
    disabled: false,
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
      return this.$parent.$options.name === 'nick-checkbox-group'
    },
    checked () {
      const { modelData } = (this.isGroup ? this.$parent : this)
      return new Set(modelData).has(this.value)
    }
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-checkbox`
    const { checked } = this
    const custom = checked ? this.custom : 'accent'
    const { size, disabled, clicked, $slots, onclick, onmousedown, onmouseup } = this
    const className = createFrameworkClass({ [prefixClass]: true, custom, size, clicked }, prefix, prefixClass)
    const effect = $slots.effect || <div class={`${prefixClass}-effect`}></div>
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
      const { disabled } = this
      if (disabled || disabled === '') return
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
    }
  }
}
