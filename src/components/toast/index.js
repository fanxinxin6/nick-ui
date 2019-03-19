import './style/index.less'
import Vue from 'vue'
import Theme from '../../utils/theme'
import { createFrameworkClass } from '../../utils/'
const Toast = new (Vue.extend({
  data () {
    return {
      queue: []
    }
  },
  render () {
    const { prefix } = Theme
    const prefixClass = `${prefix}-toast`
    const { custom } = this
    const className = createFrameworkClass({ [prefixClass]: true, custom }, prefix, prefixClass)
    return (
      <div class={className} id={prefixClass}>
        <div class={`${prefixClass}-inner`}>ads</div>
      </div>
    )
  },
  methods: {
    checkMount () {
      const { prefix } = Theme
      const prefixId = `${prefix}-toast`
      if (!this._isMounted && !document.querySelector(`#${prefixId}`)) {
        document.body.appendChild(this.$mount().$el)
      }
    },
    message () {
      this.checkMount()
      this.checkMount()
      this.checkMount()
      this.checkMount()
    }
  }
}))()
//
export default {
  render () {
    Toast.message()
    return null
  }
}
