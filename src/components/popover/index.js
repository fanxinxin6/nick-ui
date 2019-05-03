import './style/index.less'
import Theme from '../../utils/theme.js'
import { createFrameworkClass } from '../../utils/index.js'
import Vue from 'vue'
const Popover = Vue.extend({
  name: 'nick-popover',
  props: ['reference', 'content', 'placement', 'visible', 'openDelay', 'custom', 'popoverClass'],
  data () {
    return {
      isEnter: false,
      isReference: false
    }
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-popover`
    const { custom, visible, isEnter, popoverClass, isReference } = this
    const reference = isReference ? 'reference' : 'self'
    const className = createFrameworkClass({ [prefixClass]: true, custom, visible, enter: isEnter, [`leave-${reference}`]: !isEnter }, prefix, prefixClass)
    return visible ? (
      <div onmouseenter={this.enter} onmouseleave={this.leave} ref="popover" class={`${className} ${popoverClass}`}>
        {this.content.default}
      </div>
    ) : null
  },
  mounted () {
    this.$nextTick(() => {
      if (this.visible) {
        this.position()
      }
    })
  },
  destroyed () {
    const { $el } = this
    $el.parentNode.removeChild($el)
  },
  methods: {
    enter (event, isReference = false) {
      const { openDelay } = this
      this.time = Date.now()
      this.isLeave = false
      this.isReference = isReference
      if (openDelay) {
        setTimeout(() => {
          if (!this.isLeave) {
            this.isEnter = true
          }
        }, openDelay)
      } else {
        this.isEnter = true
      }
    },
    leave (event, isReference = false) {
      this.isReference = isReference
      setTimeout(() => {
        const useTime = Date.now() - this.time
        if (useTime > 10) {
          this.isLeave = true
          this.isEnter = false
        }
      }, 0)
    },
    position () {
      const { popover } = this.$refs
      const { reference, placement = 'center' } = this
      const { offsetWidth, offsetHeight } = popover
      const { clientWidth, clientHeight } = document.documentElement
      const { width, height, left, right, top, bottom } = reference.getBoundingClientRect()
      const minX = 0
      const minY = 0
      const maxX = clientWidth - offsetWidth
      const maxY = clientHeight - offsetHeight
      const hLeft = left - offsetWidth
      const hRight = right
      const hCenter = left + ((width - offsetWidth) / 2)
      const vTop = top - offsetHeight
      const vCenter = top + ((height - offsetHeight) / 2)
      const vBottom = bottom
      const placementArr = placement.toLowerCase().split('-')
      const positionMap = { left: hLeft, right: hRight, top: vTop, bottom: vBottom }
      let xIndex = placementArr.findIndex(value => /(left|right)/.test(value))
      let yIndex = placementArr.findIndex(value => /(top|bottom)/.test(value))
      let x = positionMap[placementArr[xIndex]] || hCenter
      let y = positionMap[placementArr[yIndex]] || vCenter
      x = x < minX || x > maxX ? [hLeft, hCenter, hRight].find(value => value >= minX && value <= maxX) : x
      y = y < minY || y > maxY ? [vTop, vCenter, vBottom].find(value => value >= minY && value <= maxY) : y
      popover.style = `left:${x}px;top:${y}px`
    }
  }
})
export default {
  name: 'nick-popover-reference',
  props: {
    custom: {
      default: 'primary'
    },
    disabled: {
      default: false
    },
    placement: {
      default: 'bottom'
    },
    visible: {
      default: true
    },
    offset: {
      default: () => ({ x: 0, y: 0 })
    },
    openDelay: {
      default: 0
    },
    popoverClass: {
      default: ''
    }
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-popover-reference`
    const { enter, leave } = this
    return (
      <div class={prefixClass} ref="reference" onmouseenter={enter} onmouseleave={leave}>
        {this.$slots.reference}
      </div>
    )
  },
  mounted () {
    const { reference } = this.$refs
    const { $slots, placement, custom, openDelay, visible, popoverClass } = this
    const popover = new Popover({
      propsData: {
        reference,
        content: $slots,
        placement,
        custom,
        openDelay,
        visible,
        popoverClass
      }
    })
    document.body.appendChild(popover.$mount().$el)
    this.popover = popover
  },
  methods: {
    enter (event) {
      if (this.visible) {
        this.popover.enter(event, true)
      }
    },
    leave (event) {
      if (this.visible) {
        this.popover.leave(event, true)
      }
    }
  }
}
