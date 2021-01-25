import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import SortedTablePlugin from "vue-sorted-table";

Vue.config.productionTip = false
Vue.use(SortedTablePlugin);

new Vue({
  render: h => h(App),
}).$mount('#app')
