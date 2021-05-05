import Vue from 'vue'
import App from './App'
import { myRequest } from './common/api.js'

Vue.prototype.$myRuquest = myRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
