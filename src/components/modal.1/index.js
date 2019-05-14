import './style/index.less'
import { prefix } from '..'
const prefixClass = `${prefix}-modal`
export default {
  name: 'ui-modal',
  props: {
    title: {
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    fullScreen: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    escCloseModal: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  watch: {
    visible (visible) {
      this.$emit(visible ? 'open' : 'close')
    }
  },
  render () {
    const { $slots, onclick, stopClick, visible, modal, fullScreen } = this
    const className = `${prefixClass} ` + [fullScreen ? 'fullscreen' : '', visible ? 'visible' : '', modal ? 'modal' : ''].map(className => className ? `${prefixClass}-${className}` : '').join(' ')
    const close = $slots.close || <span>&times;</span>
    const title = $slots.title || this.title
    const header = $slots.header || (
      <div class={`${prefixClass}-header display-flex flex-row-between flex-col-center`}>
        <div class={`${prefixClass}-title`}>{title}</div>
        <div onclick={this.close} class={`${prefixClass}-close display-flex flex-col-center`}>
          {close}
        </div>
      </div>
    )
    return (
      <div onclick={onclick} class={`${className} display-flex flex-row-center flex-col-center`}>
        <div onclick={stopClick} class={`${prefixClass}-wrapper`}>
          {header}
          {$slots.default}
        </div>
      </div>
    )
  },
  created () {
    document.addEventListener('keydown', this.keydown)
  },
  destroyed () {
    document.removeEventListener('keydown', this.keydown)
  },
  methods: {
    keydown (event) {
      if (event.key === 'Escape' && this.escCloseModal) {
        this.close()
      }
    },
    close () {
      this.$emit('update:visible', false)
    },
    onclick (event) {
      event.stopPropagation()
      if (this.closeOnClickModal) {
        this.close()
      }
      this.$emit('click', event)
    },
    stopClick (event) {
      event.stopPropagation()
    }
  }
}
