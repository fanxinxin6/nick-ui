import './style/index.less'
import { prefix } from '..'
import ResizeObserver from 'resize-observer-polyfill'
const prefixClass = `${prefix}-scroll`
const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    clientSize: 'clientHeight',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    clientSize: 'clientWidth',
    direction: 'left'
  }
}
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
const renderThumbStyle = ({ move, size, bar }) => {
  const style = {}
  const translate = `translate${bar.axis}(${move}%)`
  style[bar.size] = size
  style.transform = translate
  style.msTransform = translate
  style.webkitTransform = translate
  return style
}
const translateRegexp = /(.*?)translate\((.*?),(.*?)\)(.*)/
const renderTranslateStyle = ({ wrap, move, axis, thumb, clientSize }) => {
  const { transform } = wrap.style
  const vertical = axis === 'Y'
  const template = vertical
    ? `translate(0px,${-move}px)`
    : `translate(${-move}px,0px)`
  const replaceTemplate = vertical
    ? `$1translate($2,${-move}px)$4`
    : `$1translate(${-move}px,$3)$4`
  if (translateRegexp.test(transform)) {
    wrap.style.transform = transform.replace(translateRegexp, replaceTemplate)
  } else {
    wrap.style.transform += template
  }
  thumb.style.transform = `translate${axis}(${(move / clientSize) * 100}%)`
}
const ScrollBar = {
  props: ['size', 'vertical', 'move', 'moveSize'],
  computed: {
    bar () {
      return BAR_MAP[this.vertical ? 'vertical' : 'horizontal']
    },
    wrap () {
      return this.$parent.wrap
    },
    container () {
      return this.$parent.container
    }
  },
  render () {
    const { size, move, bar, clickTrackHandler, clickThumbHandler } = this
    const style = renderThumbStyle({ size, move, bar })
    const direction = bar.axis.toLowerCase()
    return (
      <div
        onmousedown={clickTrackHandler}
        class={`${prefixClass}-bar ${prefixClass}-bar-${direction}`}
      >
        <div
          ref="thumb"
          onmousedown={clickThumbHandler}
          style={style}
          class={`${prefixClass}-bar-${direction}-thumb`}
        />
      </div>
    )
  },
  methods: {
    clickTrackHandler (event) {
      const offset = Math.abs(
        event.target.getBoundingClientRect()[this.bar.direction] -
          event[this.bar.client]
      )
      const thumbHalf = this.$refs.thumb[this.bar.offset] / 2
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100) / this.$el[this.bar.offset]
      this.wrap[this.bar.scroll] =
        (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100
    },
    clickThumbHandler (event) {
      const { bar } = this
      const { currentTarget } = event
      const { offset, axis, direction, client } = bar
      this.startDrag(event)
      this[axis] =
        currentTarget[offset] -
        (event[client] - currentTarget.getBoundingClientRect()[direction])
    },
    startDrag (event) {
      event.stopImmediatePropagation()
      this.cursorDown = true
      addEventListener(document, 'mousemove', this.mouseMoveDocumentHandler)
      addEventListener(document, 'mouseup', this.mouseUpDocumentHandler)
      document.onselectstart = () => false
    },
    mouseMoveDocumentHandler (event) {
      const { cursorDown, container, bar, $el, wrap } = this
      if (!cursorDown) return
      const { axis, direction, client, clientSize, offset, scrollSize } = bar
      const prevPage = this[axis]
      if (!prevPage) return
      const { thumb } = this.$refs
      const barOffset = -(
        $el.getBoundingClientRect()[direction] - event[client]
      )
      const thumbClickPosition = thumb[offset] - prevPage
      const thumbPositionPercentage =
        ((barOffset - thumbClickPosition) * 100) / $el[bar.offset]
      const maxMove = container[scrollSize] - container[clientSize]
      let move = (thumbPositionPercentage * container[scrollSize]) / 100
      if (move >= maxMove) {
        move = maxMove
      } else if (move < 0) {
        move = 0
      }
      this.$parent.scroll({ move, maxMove, axis })
      renderTranslateStyle({
        wrap,
        move,
        axis,
        clientSize: container[clientSize],
        thumb
      })
    },
    mousewheelHandler (detail, moveSize) {
      const { container, bar, wrap } = this
      const { thumb } = this.$refs
      const { axis, clientSize, scrollSize } = bar
      const maxMove = container[scrollSize] - container[clientSize]
      const vertical = axis === 'Y'
      let move = Math.abs(
        parseFloat(
          wrap.style.transform.replace(
            translateRegexp,
            vertical ? '$3' : '$2'
          ) || 0
        )
      )
      move += detail > 0 ? moveSize : -moveSize
      if (move > maxMove) {
        move = maxMove
      } else if (move < 0) {
        move = 0
      }
      this.$parent.scroll({ move, maxMove, axis })
      renderTranslateStyle({
        wrap,
        axis,
        move,
        clientSize: container[clientSize],
        thumb
      })
    },
    mouseUpDocumentHandler () {
      this.cursorDown = false
      this[this.bar.axis] = 0
      removeEventListener(document, 'mousemove', this.mouseMoveDocumentHandler)
      document.onselectstart = null
    }
  },
  destroyed () {
    removeEventListener(document, 'mouseup', this.mouseUpDocumentHandler)
  }
}
export default {
  components: {
    ScrollBar
  },
  props: ['noresize', 'resizeElement', 'scrollType', 'scrollSize'],
  computed: {
    wrap () {
      return this.$refs.wrapper
    },
    container () {
      return this.$refs.container
    }
  },
  data () {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0,
      n: 20,
      prefixClass
    }
  },
  render () {
    const { sizeWidth, sizeHeight, moveX, moveY, mousewheelHandler } = this
    const className = `${prefixClass} ` + [].map(className => className ? `${prefixClass}-${className}` : '').join(' ')
    return (
      <div onmousewheel={mousewheelHandler} ref="container" class={`${className}`}>
        <div ref="wrapper" class={`${prefixClass}-wrapper`}>
          {this.$slots.default}
        </div>
        <ScrollBar ref="xBar" move={moveX} size={sizeWidth}/>
        <ScrollBar ref="yBar" move={moveY} size={sizeHeight} vertical={true}/>
      </div>
    )
  },
  mounted () {
    const { wrapper, container } = this.$refs
    addEventListener(container, 'DOMMouseScroll', this.mousewheelHandler)
    if (this.noresize) return
    container.resizeContext = this
    wrapper.resizeContext = this
    resizeObserver.observe(container)
    resizeObserver.observe(wrapper)
  },
  beforeDestroy () {
    const { wrapper, container } = this.$refs
    removeEventListener(container, 'DOMMouseScroll', this.mousewheelHandler)
    if (this.noresize) return
    container.resizeContext = null
    wrapper.resizeContext = null
    resizeObserver.unobserve(container)
    resizeObserver.unobserve(wrapper)
  },
  methods: {
    update () {
      let heightPercentage, widthPercentage
      const { container } = this.$refs
      const {
        clientWidth,
        clientHeight,
        scrollWidth,
        scrollHeight
      } = container
      if (!container) return
      heightPercentage = (clientHeight * 100) / scrollHeight
      widthPercentage = (clientWidth * 100) / scrollWidth
      this.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : ''
      this.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : ''
    },
    mousewheelHandler (event) {
      event.stopImmediatePropagation()
      event.preventDefault()
      const { xBar, yBar } = this.$refs
      const scrollSize = parseInt(this.scrollSize) || 50
      const { detail, deltaX, deltaY } = event
      if (deltaX) {
        xBar.mousewheelHandler(deltaX, scrollSize)
      } else if (deltaY) {
        yBar.mousewheelHandler(deltaY, scrollSize)
      } else if (detail) {
        yBar.mousewheelHandler(detail, scrollSize)
      }
    },
    scroll ({ move, maxMove, axis }) {
      this.$emit('scroll', { [axis]: move, axis, move })
      const scrollLock = `${axis}-lock`
      if (move !== maxMove) return
      if (!this[scrollLock]) {
        this[scrollLock] = true
        this.$emit('scrollend', {
          loaded: () => {
            this[scrollLock] = true
          },
          complete: () => {
            this[scrollLock] = false
          }
        })
      }
    }
  }
}
