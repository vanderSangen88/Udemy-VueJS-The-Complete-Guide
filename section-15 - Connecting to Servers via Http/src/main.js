import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App.vue'

Vue.use(VueResource);
Vue.http.options.root = 'http://www.omdbapi.com/'

const vm = new Vue({
  ...App
})

vm.$mount('#app');