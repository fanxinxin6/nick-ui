import './style/index.less'
import Theme from '../../utils/theme.js'
import { createFrameworkClass } from '../../utils/index.js'
import Popover from '../popover/index.js'
export default {
  name: 'nick-tooltip',
  props: ['content', 'placement', 'visible', 'openDelay', 'tooltipClass', 'trigger', 'enterable', 'offset', 'custom', 'autoPlacement'],
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-tooltip`
    const className = createFrameworkClass({ [prefixClass]: true }, prefix, prefixClass)
    const { enter, leave, change, $slots, trigger, placement, openDelay, content, autoPlacement, tooltipClass, offset, enterable = true, visible, custom } = this
    return (
      <Popover trigger={trigger} onenter={enter} onleave={leave} onchange={change} custom={custom} autoPlacement={autoPlacement} popoverClass={`${tooltipClass}  ${className} ${prefixClass}-enterable-${enterable}`} placement={placement} openDelay={openDelay} reference={$slots.default} offset={offset} visible={visible}>
        {$slots.content || content}
      </Popover>
    )
  },
  methods: {
    enter () {
      this.$emit('enter')
    },
    leave () {
      this.$emit('leave')
    },
    change (visible) {
      this.$emit('change', visible)
    }
  }
}
