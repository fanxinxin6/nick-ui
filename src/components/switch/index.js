import './style/index.less'
import Theme from '../../utils/theme.js'
import { createFrameworkClass } from '../../utils/index.js'
import Ripple from '../ripple/index.js'
export default {
  name: 'nick-switch',
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
  data () {
    return {
      status: false
    }
  },
  computed: {
    isGroup () {
      return this.$parent.$options.name === 'nick-switch-group'
    },
    checked () {
      const { modelData } = (this.isGroup ? this.$parent : this)
      return modelData ? new Set(modelData).has(this.value) : this.status
    }
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-switch`
    const { checked, ripple } = this
    const custom = checked ? this.custom : 'accent'
    const { size, disabled, $slots, onclick, onmousedown } = this
    const className = createFrameworkClass({ [prefixClass]: true, custom, size }, prefix, prefixClass)
    const customClass = `${prefix}-${custom}`
    const customNoHover = `${customClass}-nohover`
    const RippleEffect = ripple ? <div class={`${customClass} ${prefixClass}-effect-ripple`}><Ripple ref="ripple"></Ripple></div> : null
    const effect = $slots.effect || <div class={`${prefixClass}-effect ${customClass}${checked ? '-lighten-8' : ''} display-flex flex-row-center flex-col-center`}><div onmousedown={onmousedown} class={`${prefixClass}-effect-inner ${customClass} ${customNoHover}`}>{RippleEffect}</div></div>
    return (
      <button ref="container" onclick={onclick} disabled={disabled} checked={checked} type="button" class={className}>
        <div class="display-flex flex-col-center">
          {effect}
          <div class={`${prefixClass}-wrapper  display-flex flex-row-center flex-col-center`}>
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
      const { value, isGroup } = this
      let { modelData } = this
      modelData = isGroup || modelData ? new Set((isGroup ? this.$parent : this).modelData) : modelData
      if (modelData === undefined) {
        modelData = !this.status
        this.status = modelData
      } else {
        if (modelData.has(value)) {
          modelData.delete(value)
        } else {
          modelData.add(value)
        }
        modelData = [...modelData]
      }
      if (isGroup) {
        this.$parent.$emit('input', modelData)
      } else {
        this.$emit('input', modelData)
      }
      this.$emit('change', modelData, event)
    }

  }
}
