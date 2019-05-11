import './style/index.less'
import Vue from 'vue'
import Theme from '../../utils/theme'
import { createFrameworkClass } from '../../utils/index.js'
const Message = Vue.extend({
  name: 'nick-notice-message',
  props: ['duration', 'content', 'noticeClass', 'container', 'inner'],
  data () {
    return {
      isEnter: false,
      isLeave: false
    }
  },
  mounted () {
    const { duration = 500, container = document.body, $el } = this
    container.appendChild($el)
    setTimeout(() => {
      this.isEnter = true
      if (duration) {
        const delay = this.getDelay()
        setTimeout(() => {
          setTimeout(() => {
            this.isEnter = false
            this.isLeave = true
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
    const prefixClass = `${prefix}-notice-message`
    const { isEnter, content, noticeClass = '', inner = '', isLeave } = this
    const className = createFrameworkClass({ [prefixClass]: true, enter: isEnter, leave: isLeave, inner }, prefix, prefixClass)
    this.$nextTick(this.setHeight)
    return (
      <div ref="message" class={`${className} ${noticeClass}`}>
        {content}
      </div>
    )
  },
  methods: {
    setHeight () {
      const { message } = this.$refs
      const { clientHeight } = message
      if (clientHeight) {
        message.style.height = `${message.clientHeight}px`
      }
    },
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
      this.isLeave = true
      this.removeMessage()
    }
  }
})
export const notice = (props = { content: '', noticeClass: '' }) => {
  return new Message({
    propsData: props
  }).$mount()
}
export default {
  props: {
    duration: {
      default: 0
    },
    content: {
      default: ''
    },
    custom: {
      default: 'primary'
    }
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-notice`
    const { $slots } = this
    const className = createFrameworkClass({ [prefixClass]: true }, prefix, prefixClass)
    this.prefixClass = prefixClass
    this.$nextTick(this.notice)
    return (
      <div ref="container" class={className}>
        {$slots.default}
      </div>
    )
  },
  methods: {
    notice () {
      const { duration, prefixClass, $slots, content, inner } = this
      const { container } = this.$refs
      const message = notice({ container, inner: true, duration, noticeClass: `${prefixClass}-message` })
      message.content = $slots.default
      const { content: vnodes } = message
      if (vnodes && vnodes.forEach) {
        vnodes.forEach(vnode => {
          const { data = {} } = vnode
          const { on = {} } = data
          for (let [event, callback] of Object.entries(on)) {
            on[event] = (...arg) => {
              console.log(789)
              callback(message, ...arg)
            }
          }
        })
      }
    }
  }
}
