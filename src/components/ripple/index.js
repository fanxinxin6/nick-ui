import './style/index.less'
import Theme from '../../utils/theme'
import { createFrameworkClass } from '../../utils/'
export default {
  name: 'ui-ripple',
  data () {
    return {
      innerStyle: {},
      show: false
    }
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-ripple`
    const { innerStyle, show } = this
    const className = createFrameworkClass({ [prefixClass]: true }, prefix, prefixClass)
    return show ? (
      <div ref="container" class={className}>
        <div ref="inner" style={innerStyle} class={`${prefixClass}-inner`}/>
      </div>
    ) : null
  },
  methods: {
    animationend () {
      // this.show = false
      this.$refs.inner.removeEventListener('animationend', this.animationend)
    },
    rippleClick ({ pageX, pageY }, { center } = {}) {
      this.show = true
      this.$nextTick(() => {
        const scale = 2
        const { prefix } = Theme
        const prefixClass = `${prefix}-ripple`
        const { $parent } = this
        const { container, inner } = this.$refs
        const $parentElement = $parent.$el
        const { clientWidth, clientHeight } = $parentElement
        const size = Math.max(clientWidth, clientHeight)
        const offset = container.getBoundingClientRect()
        const width = size * scale
        const height = size * scale
        const style = {
          width: `${width}px`,
          height: `${height}px`,
          left: `${pageX - offset.left - width / 2}px`,
          top: `${pageY - offset.top - height / 2}px`
        }
        console.log(center)
        const showClass = `${prefixClass}-show`
        inner.addEventListener('animationend', this.animationend)
        inner.classList.remove(showClass)
        setTimeout(() => {
          inner.classList.add(showClass)
        }, 17)
        this.innerStyle = style
      })
    }
  }
}
