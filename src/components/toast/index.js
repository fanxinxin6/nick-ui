import './style/index.less'
import Vue from 'vue'
import Theme from '../../utils/theme'
import { createFrameworkClass } from '../../utils/index.js'
const Message = Vue.extend({
  name: 'nick-toast-message',
  props: ['duration', 'content', 'toastClass', 'container', 'inner'],
  data () {
    return {
      isEnter: false
    }
  },
  mounted () {
    const { duration = 500, container = document.body } = this
    container.appendChild(this.$el)
    setTimeout(() => {
      this.isEnter = true
      if (duration) {
        const delay = this.getDelay()
        setTimeout(() => {
          setTimeout(() => {
            this.isEnter = false
            this.removeMessage()
          }, duration)
        }, delay)
      }
    }, 16)
  },
  beforeDestroy () {
    const { message } = this.$refs
    if (message.parentNode && !this.isEnter) {
      message.parentNode.removeChild(message)
    }
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-toast-message`
    const { isEnter, content, toastClass = '', inner = '' } = this
    const className = createFrameworkClass({ [prefixClass]: true, enter: isEnter, leave: !isEnter, inner }, prefix, prefixClass)
    return (
      <div ref="message" class={`${className} ${toastClass}`}>
        {content}
      </div>
    )
  },
  methods: {
    getDelay () {
      const { message } = this.$refs
      const style = getComputedStyle(message)
      const transitionDelay = Math.max(...style.transitionDelay.split(',').map(item => parseFloat(item) * 1000))
      const transitionDuration = Math.max(...style.transitionDuration.split(',').map(item => parseFloat(item) * 1000))
      const delay = transitionDelay + transitionDuration
      return delay
    },
    removeMessage () {
      setTimeout(() => {
        this.$destroy()
      }, this.getDelay())
    },
    close () {
      this.isEnter = false
      this.removeMessage()
    }
  }
})
export const toast = (props = { content: '', toastClass: '' }) => {
  return new Message({
    propsData: props
  }).$mount()
}
export default {
  props: ['duration', 'content', 'toastClass', 'inner'],
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-toast`
    const { $slots, inner = false } = this
    const className = createFrameworkClass({ [prefixClass]: true }, prefix, prefixClass)
    this.$nextTick(this.toast)
    return inner ? (
      <div ref="container" class={className}>
        {$slots.default}
      </div>
    ) : null
  },
  methods: {
    toast () {
      const { duration, toastClass, $slots, content, inner } = this
      const { container } = this.$refs
      const message = toast({ container, inner, duration, toastClass })
      message.content = inner ? $slots.content || content : $slots.default
      const { content: vnodes } = message
      if (vnodes && vnodes.forEach) {
        vnodes.forEach(vnode => {
          const { data = {} } = vnode
          const { on = {} } = data
          for (let [event, callback] of Object.entries(on)) {
            on[event] = (...arg) => {
              callback(message, ...arg)
            }
          }
        })
      }
    }
  }
}
