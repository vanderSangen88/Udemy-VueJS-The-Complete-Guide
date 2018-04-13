import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  console.log('global beforeEach');
  next(); // continues journey
});

const vm = new Vue({
 ...App,
 router
});

vm.$mount('#app');
