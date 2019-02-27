import Vue from 'vue'
import App from './App.vue'
// Vue.use(nickUi)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
// test
/**
 *  1. 提供完整的测试环境
 *  2. 提供编译后的文件
 *  3. 提供源码目录结构
 */
