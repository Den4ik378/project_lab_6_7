import $ from 'jquery'
import Vue from 'vue'
import App from './App.vue'
import 'jquery-mask-plugin' // Додайте цей рядок

new Vue({
  render: (h) => h(App)
}).$mount('#app')
