import Vue from 'vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App.vue'

import { routes } from './routes';

Vue.use(VueResource);
Vue.http.options.root = 'http://www.omdbapi.com/'

Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

const vm = new Vue({
  ...App,
  router
})

vm.$mount('#app');