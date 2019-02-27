import './style/index.less'
import { prefix } from '..'
const prefixClass = `${prefix}-button`
export default {
  props: {
    custom: {
      type: String,
      default: 'primary',
      validator: value => new Set(['primary']).has(value)
    },
    size: {
      type: String,
      default: 'normal',
      validator: value => new Set(['normal', 'small', 'mendium', 'large']).has(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render (h) {
    const { custom, size, disabled, $slots, onclick } = this
    const className = ['', custom, size].map(className => className ? `${prefixClass}-${className}` : prefixClass).join(' ')
    const effect = $slots.effect ? $slots.effect[0] : <div class={`${prefixClass}-effect`}>    </div>
    return (
      <button onclick={onclick} disabled={disabled} type="button" class={className}>
        <div class={`${prefixClass}-wrapper display-flex flex-row-center flex-col-center`}>
          {effect}
          <div class={`${prefixClass}-inner`}>
            {$slots.default}
          </div>
        </div>
      </button>
    )
  },
  methods: {
    onclick () {
      console.log(55)
    }
  }
}
