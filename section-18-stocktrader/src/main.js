import Vue from 'vue'
import VueRouter from 'vue-router'
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

const vm = new Vue({
  ...App,
  router,
  store
});

vm.$mount('#app');
