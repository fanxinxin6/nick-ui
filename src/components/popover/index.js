import './style/index.less'
import Theme from '../../utils/theme.js'
import { createFrameworkClass } from '../../utils/index.js'
import Vue from 'vue'
const Popover = Vue.extend({
  name: 'nick-popover',
  props: ['reference', 'trigger', 'content', 'placement', 'visible', 'openDelay', 'custom', 'popoverClass', 'offset', 'autoPosition'],
  data () {
    return {
      isEnter: false,
      isLeave: false,
      isReference: false,
      show: false,
      placementClass: ''
    }
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-popover`
    const { custom, visible, trigger, enter, leave, isEnter, popoverClass, isReference, placementClass, isLeave } = this
    const reference = isReference ? 'reference' : 'self'
    const className = createFrameworkClass({ [prefixClass]: true, custom, visible, enter: isEnter, leave: isLeave, [`leave-${reference}`]: !isEnter }, prefix, prefixClass)
    this.prefixClass = prefixClass
    this.$nextTick(this.position)
    return visible ? (
      <div onmouseenter={enter} onmouseleave={trigger === 'hover' ? leave : function () {}} ref="popover" class={`${className} ${prefix}-${custom}-currentColor ${popoverClass} ${placementClass}-${isEnter ? 'enter' : 'leave'}`}>
        <div ref="wrapper" class={`${prefixClass}-wrapper`}>
          {this.content.default}
        </div>
      </div>
    ) : null
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
      this.createPopover()
      setTimeout(() => {
        if (openDelay) {
          setTimeout(() => {
            if (!this.isLeave) {
              this.isEnter = true
            }
          }, openDelay)
        } else {
          this.isEnter = true
        }
      }, 0)
    },
    leave (event, isReference = false) {
      this.isReference = isReference
      setTimeout(() => {
        const useTime = Date.now() - this.time
        if (useTime > 10) {
          this.isLeave = true
          this.isEnter = false
          this.removePopover()
        }
      }, 0)
    },
    createPopover () {
      const { popover } = this.$refs
      if (!popover.parentNode) {
        document.body.appendChild(popover)
        this.onEnter()
      }
    },
    removePopover () {
      const { popover } = this.$refs
      const style = getComputedStyle(popover)
      const transitionDelay = Math.max(...style.transitionDelay.split(',').map(item => parseFloat(item) * 1000))
      const transitionDuration = Math.max(...style.transitionDuration.split(',').map(item => parseFloat(item) * 1000))
      const delay = transitionDelay + transitionDuration
      setTimeout(() => {
        if (popover.parentNode && this.isLeave) {
          popover.parentNode.removeChild(popover)
        }
      }, delay)
    },
    position () {
      const html = document.documentElement
      const body = document.body
      const { popover, wrapper } = this.$refs
      const { reference, placement = 'center', prefixClass, offset = {}, autoPosition } = this
      const { x: offsetX, y: offsetY } = offset
      const { offsetWidth, offsetHeight, style } = popover
      const { scrollWidth, scrollHeight } = html
      const scrollTop = body.scrollTop || html.scrollTop
      const scrollLeft = body.scrollLeft || html.scrollLeft
      const rect = reference.getBoundingClientRect()
      const { width, height } = rect
      const left = rect.left + scrollLeft
      const right = rect.right + scrollLeft
      const top = rect.top + scrollTop
      const bottom = rect.bottom + scrollTop
      const minX = 0
      const minY = 0
      const maxX = scrollWidth - offsetWidth
      const maxY = scrollHeight - offsetHeight
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
      if (autoPosition) {
        x = x < minX || x > maxX ? [hLeft, hCenter, hRight].find(value => value >= minX && value <= maxX) : x
        y = y < minY || y > maxY ? [vTop, vCenter, vBottom].find(value => value >= minY && value <= maxY) : y
      }
      const horizontal = x === hLeft ? 'left' : x === hCenter ? 'center' : 'right'
      const vertical = y === vTop ? 'top' : x === vCenter ? 'center' : 'bottom'
      this.placementClass = `${prefixClass}-${vertical} ${prefixClass}-${horizontal}-${vertical}`
      x += parseInt(offsetX) || 0
      y += parseInt(offsetY) || 0
      style.left = `${x}px`
      style.top = `${y}px`
      console.log(wrapper.offsetHeight)
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
    },
    reference: {
      default: null
    },
    trigger: {
      default: 'hover'
    }
  },
  destroyed () {
    document.removeEventListener('click', this.click)
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-popover-reference`
    const { enter, leave, reference } = this
    return (
      <div class={prefixClass} ref="reference" onmouseenter={enter} onmouseleave={leave}>
        {this.$slots.reference || reference}
      </div>
    )
  },
  mounted () {
    const { reference } = this.$refs
    const { $slots, placement, custom, openDelay, visible, popoverClass, offset, trigger } = this
    const popover = new Popover({
      propsData: {
        reference,
        content: $slots,
        placement,
        custom,
        openDelay,
        visible,
        popoverClass,
        offset,
        trigger
      },
      methods: {
        onEnter: () => {
          this.$emit('enter').$emit('change', true)
        },
        onLeave: () => {
          this.$emit('leave').$emit('change', false)
        }
      }
    })
    popover.$mount()
    document.addEventListener('click', this.click)
    this.popover = popover
  },
  methods: {
    click (event) {
      if (this.visible) {
        const { popover, trigger } = this
        if (trigger !== 'click') return
        const { $el } = popover
        const { reference } = this.$refs
        let { target } = event
        let isReference = false
        let isPopover = false
        while (target) {
          if (target === reference) {
            isReference = true
            break
          }
          if (target === $el) {
            isPopover = true
            break
          }
          target = target.parentNode
        }
        if (isReference) {
          const { isEnter } = popover
          popover[isEnter ? 'leave' : 'enter'](event, true)
        } else if (!isPopover) {
          popover.leave(event)
        }
      }
    },
    enter (event) {
      const { visible, trigger, popover } = this
      if (trigger === 'click') return
      if (visible) {
        popover.enter(event, true)
      }
    },
    leave (event) {
      const { visible, trigger, popover } = this
      if (trigger === 'click') return
      if (visible) {
        popover.leave(event, true)
      }
    }
  }
}
