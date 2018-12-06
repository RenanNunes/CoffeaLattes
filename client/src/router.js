import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CriarExperiencia from './views/CriarExperiencia.vue';
import ListarExperiencia from './views/ListarExperiencia.vue';
import DetalharExperiencia from './views/DetalharExperiencia.vue';
import Erro404 from './views/Erro404.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
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
    {
      path: '/experiencias/listar/:buscar?',
      name: 'listarExperiencia',
      component: ListarExperiencia,
    },
    {
      path: '/experiencia/detalhar',
      name: 'detalharExperiencia',
      component: DetalharExperiencia,
    },
    {
      path: '*',
      name: 'notFound',
      component: Erro404,
    },
  ],
});
