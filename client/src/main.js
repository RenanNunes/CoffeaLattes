import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'
import VueReactiveCookie from 'vue-reactive-cookie';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueReactiveCookie);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
