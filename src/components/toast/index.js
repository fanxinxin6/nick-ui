import './style/index.less'
import Vue from 'vue'
import Theme from '../../utils/theme'
import { createFrameworkClass } from '../../utils/'
const Message = Vue.extend({
  props: {
    message: {},
    custom: {
      default: 'primary'
    },
    outline: {
      default: false
    }
  },
  data () {
    return {
      leave: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.leave = true
    }, 3000)
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-toast-message`
    const { message, remove, leave, custom, outline } = this
    const className = createFrameworkClass({ [prefixClass]: true, leave, custom, outline }, prefix, prefixClass)
    return (
      <div onAnimationend={remove} onClick={remove} class={className}>
        <div class={`${prefixClass}-wrapper ${prefix}-custom-inherit-${custom}`}>
          <div class={`${prefix}-inherit-${custom}`}>
            <div class={`${prefixClass}-inner`}>
              {message}
            </div>
          </div>
        </div>
      </div>
    )
  },
  methods: {
    remove () {
      const { $el, leave } = this
      if (!leave) return
      this.$destroy()
      // $el.parentNode.removeChild($el)
    }
  }
})
const Toast = Vue.extend({
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-toast`
    const className = createFrameworkClass({ [prefixClass]: true }, prefix, prefixClass)
    return (
      <div class={className}></div>
    )
  },
  methods: {
    message ({ message } = {}) {
      const { $el } = this
      $el.appendChild(new Message({
        propsData: {
          message
        }
      }).$mount().$el)
    }
  }
})
let toast
export const message = (...arg) => {
  if (!toast) {
    toast = new Toast({
      methods: {
        checkMount () {
          const { prefix } = Theme
          const prefixClass = `${prefix}-toast`
          if (!this._isMounted) {
            this.$mount()
          }
          const { $el } = this
          const { body } = document
          $el.id = prefixClass
          const old = body.querySelector(`#${prefixClass}`)
          if (!old) {
            body.appendChild($el)
          }
        }
      }
    })
  }
  toast.checkMount()
  toast.message(...arg)
}
export default {
  render () {
    return <Toast ref="toast"></Toast>
  },
  methods: {
    message (options) {
      const { toast } = this.$refs
      if (!toast) return
      toast.message(options)
    }
  }
}
