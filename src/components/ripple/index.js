import './style/index.less'
import Theme from '../../utils/theme'
import { createFrameworkClass } from '../../utils/'
export default {
  name: 'ui-ripple',
  props: {
    center: false
  },
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
        <div style={innerStyle} class={`${prefixClass}-inner`}/>
      </div>
    ) : null
  },
  methods: {
    animationend () {
      this.show = false
      this.$refs.container.removeEventListener('animationend', this.animationend)
    },
    rippleClick ({ pageX, pageY }) {
      this.show = true
      this.$nextTick(() => {
        const scale = 2
        const { prefix } = Theme
        const prefixClass = `${prefix}-ripple`
        const { $parent, center } = this
        const { container } = this.$refs
        const $parentElement = $parent.$el
        const { clientWidth, clientHeight } = $parentElement
        const size = Math.max(clientWidth, clientHeight)
        const offset = container.getBoundingClientRect()
        const width = size * scale
        const height = size * scale
        const left = center ? -width / 2 + container.clientWidth / 2 : pageX - offset.left - width / 2
        const top = center ? -height / 2 + container.clientHeight / 2 : pageY - offset.top - height / 2
        const style = {
          width: `${width}px`,
          height: `${height}px`,
          left: `${left}px`,
          top: `${top}px`
        }
        const showClass = `${prefixClass}-${center ? 'hide' : 'show'}`
        container.addEventListener('animationend', this.animationend)
        container.classList.remove(showClass)
        setTimeout(() => {
          container.classList.add(showClass)
        }, 17)
        this.innerStyle = style
      })
    }
  }
}
