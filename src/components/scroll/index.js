import './style/index.less'
import { prefix } from '..'
import ResizeObserver from 'resize-observer-polyfill'
const prefixClass = `${prefix}-scroll`
const addEventListener = (() => {
  if (document.addEventListener) {
    return (element, event, handler, ...arg) => {
      element.addEventListener(event, handler, ...arg)
    }
  } else {
    return (element, event, handler, ...arg) => {
      element.attachEvent('on' + event, handler, ...arg)
    }
  }
})()
const removeEventListener = () => {
  if (document.removeEventListener) {
    return (element, event, handler) => {
      element.removeEventListener(event, handler)
    }
  } else {
    return (element, event, handler) => {
      element.detachEvent(`on${event}`, handler)
    }
  }
}
const resizeObserver = new ResizeObserver(entries => {
  entries.forEach(({ target }) => {
    const { resizeContext } = target
    if (resizeContext && resizeContext.update) {
      resizeContext.update()
    }
  })
})
const renderThumbStyle = ({ size, vertical }) => {
  const style = {}
  const sizeAttr = vertical ? 'height' : 'width'
  style[sizeAttr] = size
  return style
}
const ScrollBar = {
  props: ['size', 'vertical'],
  render () {
    const { vertical = false, size = '', startDrag } = this
    const direction = vertical ? 'y' : 'x'
    const style = renderThumbStyle({ size, vertical })
    return (
      <div class={`${prefixClass}-bar ${prefixClass}-bar-${direction}`}>
        <div onmousedown={startDrag} style={style} class={`${prefixClass}-bar-${direction}-thumb`}>
        </div>
      </div>
    )
  },
  methods: {
    startDrag (event) {

    }
  }
}
export default {
  components: {
    ScrollBar
  },
  props: {
  },
  data () {
    return {
      n: 20,
      heightPercentage: '',
      widthPercentage: ''
    }
  },
  render () {
    const { $slots, onclick, n, heightPercentage, widthPercentage } = this
    const className = `${prefixClass} ` + [].map(className => className ? `${prefixClass}-${className}` : '').join(' ')
    const test = []
    for (let i = 0; i < n; i++) {
      test.push(<div>{i}</div>)
    }
    return (
      <div ref="container" class={`${className}`}>
        <div ref="wrapper" class={`${prefixClass}-wrapper`}>
          {test}
        </div>
        <ScrollBar size={widthPercentage}/>
        <ScrollBar size={heightPercentage} vertical={true}/>
      </div>
    )
  },
  mounted () {
    const { wrapper } = this.$refs
    wrapper.resizeContext = this
    resizeObserver.observe(wrapper)
    setInterval(() => {
      // this.n = Math.floor(Math.random() * 60) + 1
    }, 2000)
  },
  beforeDestroy () {
    const { wrapper } = this.$refs
    wrapper.resizeContext = null
    resizeObserver.unobserve(wrapper)
  },
  methods: {
    update () {
      const { container, wrapper } = this.$refs
      const { clientHeight, clientWidth } = container
      const { scrollHeight, scrollWidth } = wrapper
      const heightPercentage = clientHeight * 100 / scrollHeight
      const widthPercentage = clientWidth * 100 / scrollWidth
      this.heightPercentage = heightPercentage < 100 ? heightPercentage + '%' : ''
      this.widthPercentage = widthPercentage < 100 ? widthPercentage + '%' : ''
    }
  }
}
/**
 *     const observer = new ResizeObserver(entries => {
      entries.forEach(entrie => {
        this.update()
      })
    })
    observer.observe(this.$refs.a)

 */
