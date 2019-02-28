import './style/index.less'
import { prefix } from '..'
const prefixClass = `${prefix}-button`
export default {
  name: 'ui-button',
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
    }
  },
  data () {
    return {
      clicked: false
    }
  },
  render () {
    const { custom, size, shape, disabled, clicked, $slots, onclick } = this
    const className = `${prefixClass} ` + [custom, size, shape, clicked ? 'clicked' : ''].map(className => className ? `${prefixClass}-${className}` : '').join(' ')
    const effect = $slots.effect || <div class={`${prefixClass}-effect`}>    </div>
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
    onclick (event) {
      this.$emit('click', event)
      this.clicked = false
      setTimeout(() => {
        this.clicked = true
      }, 17)
    }
  }
}
