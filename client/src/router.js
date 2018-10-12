import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CriarExperiencia from './views/CriarExperiencia.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/experiencias/criar',
      name: 'novaExperiencia',
      component: CriarExperiencia,
    },
  ],
});
