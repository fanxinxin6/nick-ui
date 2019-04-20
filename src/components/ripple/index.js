import './style/index.less'
import Theme from '../../utils/theme'
import { createFrameworkClass } from '../../utils/'
export default {
  name: 'nick-ripple',
  props: {
    center: false,
    custom: {
      default: 'primary'
    }
  },
  data () {
    return {
      show: true
    }
  },
  render () {
    const { prefix } = Theme
    const { custom } = this
    const prefixClass = `${prefix}-ripple`
    const className = createFrameworkClass({ [prefixClass]: true }, prefix, prefixClass)
    this.prefixClass = prefixClass
    return this.show ? (
      <div ref="container" class={className}>
      </div>
    ) : null
  },
  methods: {
    enter (event) {
      const { prefixClass } = this
      const { container } = this.$refs
      const { clientX, clientY } = event
      const { width, height, top, left } = container.getBoundingClientRect()
      const x = clientX - left
      const y = clientY - top
      const size = width === height ? width * 1.412 : Math.sqrt(width * width + height * height)
      const ripple = document.createElement('div')
      const { style } = ripple
      const mouseup = () => {
        const style = getComputedStyle(ripple)
        const transitionDelay = Math.max(...style.transitionDelay.split(',').map(item => parseFloat(item) * 1000))
        const transitionDuration = Math.max(...style.transitionDuration.split(',').map(item => parseFloat(item) * 1000))
        const delay = transitionDelay + transitionDuration
        document.removeEventListener('mouseup', mouseup)
        ripple.classList.add(`${prefixClass}-inner-leave`)
        setTimeout(() => {
          if (Date.now() - this.time > delay) {
            // this.show = false
          }
        }, delay)
      }
      style.width = `${size * 2}px`
      style.height = `${size * 2}px`
      style.left = `${-size + x}px`
      style.top = `${-size + y}px`
      ripple.classList.add(`${prefixClass}-inner`)
      container.appendChild(ripple)
      setTimeout(() => {
        ripple.classList.add(`${prefixClass}-inner-enter`)
      }, 0)
      document.addEventListener('mouseup', mouseup)
    },
    rippleShow (event) {
      this.show = true
      this.time = Date.now()
      this.$nextTick(() => {
        this.enter(event)
      })
    }
  }
}
// 点击创建元素  动画结束则消失  或者
