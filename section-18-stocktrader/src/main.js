import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import { routes } from './routes'
import store from './store/store'

// Enable VueRouter
Vue.use(VueRouter);
// Setup Router
const router = new VueRouter({
  mode: 'history',
  routes
});

// Create global filter
Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString();
});

// Enable VueResource
Vue.use(VueResource);
// Setup Resource
Vue.http.options.root = '';

const vm = new Vue({
  ...App,
  router,
  store
});

vm.$mount('#app');
