import './style/index.less'
import Theme from '../../utils/theme.js'
import { createFrameworkClass } from '../../utils/index.js'
import Popover from '../popover/index.js'
export default {
  name: 'nick-tooltip',
  props: ['content', 'placement', 'visible', 'openDelay', 'tooltipClass'],
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-tooltip`
    const className = createFrameworkClass({ [prefixClass]: true }, prefix, prefixClass)
    const { $slots, placement, openDelay, content, tooltipClass } = this
    return (
      <Popover popoverClass={`${tooltipClass} ${className}`} placement={placement} openDelay={openDelay} reference={$slots.default}>
        {$slots.content || content}
      </Popover>
    )
  },
  methods: {
  }
}
