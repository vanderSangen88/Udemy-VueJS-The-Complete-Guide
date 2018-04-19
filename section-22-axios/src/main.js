import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

import router from './router'
import store from './store'

// Inject package
Vue.use(Vuelidate);

const vm = new Vue({
  ...App,
  router,
  store
});

vm.$mount('#app');

