import './style/index.less'
import { prefix } from '..'
const prefixClass = `${prefix}-scroll`
const ScrollBar = {
  render () {
    return (
      <div class={`${prefixClass}-bar`}>
        <div class={`${prefixClass}-bar-thumb`}>

        </div>
      </div>
    )
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
    }
  },
  render () {
    const { $slots, onclick } = this
    const className = `${prefixClass} ` + [].map(className => className ? `${prefixClass}-${className}` : '').join(' ')
    return (
      <div class={`${className}`}>
        <div class={`${prefixClass}-wrapper`}>
          <div class={`${prefixClass}-view`}>

          </div>
        </div>
      </div>
    )
  },
  methods: {
  }
}
